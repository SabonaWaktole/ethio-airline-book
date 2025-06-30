import React, { useState, useCallback, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCw, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';


// ✅ Register the worker properly
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';


interface PdfViewerProps {
  pdfUrl: string;
  mode: 'continuous' | 'pagination';
  bookTitle: string;
}

export const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl, mode, bookTitle }) => {
  const { t } = useLanguage();
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [loadedPages, setLoadedPages] = useState<Set<number>>(new Set());
  console.log(bookTitle)
  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setLoadError(null);
    // In continuous mode, start loading first few pages
    if (mode === 'continuous') {
      setLoadedPages(new Set([1, 2, 3]));
    } else {
      setLoadedPages(new Set([1]));
    }
  }, [mode]);

  const onDocumentLoadError = useCallback((error: Error) => {
    setIsLoading(false);
    setLoadError(error.message);
    console.error('PDF loading error:', error);
  }, []);

  const onPageLoadSuccess = useCallback((pageNumber: number) => {
    setLoadedPages(prev => new Set([...prev, pageNumber]));
  }, []);

  // Handle scroll for continuous mode - load pages as needed
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    if (mode !== 'continuous') return;

    const container = e.currentTarget;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;

    // Calculate which pages should be visible
    const pageHeight = scrollHeight / numPages;
    const visibleStartPage = Math.max(1, Math.floor(scrollTop / pageHeight) + 1);
    const visibleEndPage = Math.min(numPages, Math.ceil((scrollTop + clientHeight) / pageHeight) + 1);

    // Load pages that should be visible plus a buffer
    const pagesToLoad = new Set<number>();
    for (let i = Math.max(1, visibleStartPage - 2); i <= Math.min(numPages, visibleEndPage + 2); i++) {
      pagesToLoad.add(i);
    }

    setLoadedPages(prev => new Set([...prev, ...pagesToLoad]));
  }, [mode, numPages]);

  // Navigation functions for pagination mode
  const goToPrevPage = useCallback(() => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      setLoadedPages(prev => new Set([...prev, newPage]));
    }
  }, [currentPage]);

  const goToNextPage = useCallback(() => {
    if (currentPage < numPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      setLoadedPages(prev => new Set([...prev, newPage]));
    }
  }, [currentPage, numPages]);

  const goToPage = useCallback((pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= numPages) {
      setCurrentPage(pageNumber);
      setLoadedPages(prev => new Set([...prev, pageNumber]));
    }
  }, [numPages]);

  // Zoom functions
  const zoomIn = useCallback(() => {
    setScale(prev => Math.min(prev + 0.25, 3.0));
  }, []);

  const zoomOut = useCallback(() => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  }, []);

  const resetZoom = useCallback(() => {
    setScale(1.0);
  }, []);

  // Rotation function
  const rotate = useCallback(() => {
    setRotation(prev => (prev + 90) % 360);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (mode === 'pagination') {
        switch (e.key) {
          case 'ArrowLeft':
          case 'ArrowUp':
            e.preventDefault();
            goToPrevPage();
            break;
          case 'ArrowRight':
          case 'ArrowDown':
            e.preventDefault();
            goToNextPage();
            break;
          case 'Home':
            e.preventDefault();
            goToPage(1);
            break;
          case 'End':
            e.preventDefault();
            goToPage(numPages);
            break;
        }
      }
      
      // Zoom shortcuts work in both modes
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case '=':
          case '+':
            e.preventDefault();
            zoomIn();
            break;
          case '-':
            e.preventDefault();
            zoomOut();
            break;
          case '0':
            e.preventDefault();
            resetZoom();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, goToPrevPage, goToNextPage, goToPage, numPages, zoomIn, zoomOut, resetZoom]);

  if (loadError) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {t.pdfLoadError || 'Failed to load PDF'}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {loadError}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center space-x-2">
          {/* Pagination Controls - Only show in pagination mode */}
          {mode === 'pagination' && (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={goToPrevPage}
                    disabled={currentPage <= 1}
                    className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={16} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t.previousPage || 'Previous page'}</p>
                </TooltipContent>
              </Tooltip>

              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="1"
                  max={numPages}
                  value={currentPage}
                  onChange={(e) => goToPage(parseInt(e.target.value, 10))}
                  className="w-16 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  / {numPages}
                </span>
              </div>

              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={goToNextPage}
                    disabled={currentPage >= numPages}
                    className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight size={16} />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{t.nextPage || 'Next page'}</p>
                </TooltipContent>
              </Tooltip>
            </>
          )}

          {/* Mode indicator */}
          <div className="text-sm text-gray-600 dark:text-gray-400 ml-4">
            {mode === 'continuous' ? t.continuousReading : t.pagination}
            {numPages > 0 && (
              <span className="ml-2">({numPages} {t.pages || 'pages'})</span>
            )}
          </div>
        </div>

        {/* Zoom and Tools */}
        <div className="flex items-center space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={zoomOut}
                disabled={scale <= 0.5}
                className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ZoomOut size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t.zoomOut || 'Zoom out'}</p>
            </TooltipContent>
          </Tooltip>

          <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[60px] text-center">
            {Math.round(scale * 100)}%
          </span>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={zoomIn}
                disabled={scale >= 3.0}
                className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ZoomIn size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t.zoomIn || 'Zoom in'}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={rotate}
                className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <RotateCw size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t.rotate || 'Rotate'}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1 overflow-auto bg-gray-100 dark:bg-gray-900" onScroll={handleScroll}>
        {isLoading && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                {t.loadingPdf || 'Loading PDF...'}
              </p>
            </div>
          </div>
        )}

        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading=""
          className="flex flex-col items-center"
        >
          {mode === 'continuous' ? (
            // Continuous mode - render all pages
            <div className="space-y-4 p-4">
              {Array.from({ length: numPages }, (_, index) => {
                const pageNumber = index + 1;
                const shouldLoad = loadedPages.has(pageNumber);
                
                return (
                  <div key={pageNumber} className="flex justify-center">
                    {shouldLoad ? (
                      <Page
                        pageNumber={pageNumber}
                        scale={scale}
                        rotate={rotation}
                        onLoadSuccess={() => onPageLoadSuccess(pageNumber)}
                        className="shadow-lg border border-gray-300 dark:border-gray-600"
                        loading={
                          <div className="flex items-center justify-center h-96 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
                            <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
                          </div>
                        }
                      />
                    ) : (
                      <div className="flex items-center justify-center h-96 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-lg">
                        <div className="text-gray-400 dark:text-gray-500">
                          {t.pageLoading || `Loading page ${pageNumber}...`}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            // Pagination mode - render only current page
            <div className="flex justify-center p-4">
              <Page
                pageNumber={currentPage}
                scale={scale}
                rotate={rotation}
                onLoadSuccess={() => onPageLoadSuccess(currentPage)}
                className="shadow-lg border border-gray-300 dark:border-gray-600"
                loading={
                  <div className="flex items-center justify-center h-96 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
                    <Loader2 className="w-6 h-6 animate-spin text-emerald-600" />
                  </div>
                }
              />
            </div>
          )}
        </Document>
      </div>
    </div>
  );
};