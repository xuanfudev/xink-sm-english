import { Brain } from 'lucide-react'

export default function AnalyzeEmptyState() {
    return (
      <div className="rounded-2xl w-full dark:bg-neutral-950 grid place-items-center p-4">
        <div className="text-center">
          {/* Icon block */}
          <div
            aria-hidden
            className="mx-auto mb-6 h-20 w-20 rounded-2xl bg-brand-500 shadow-[0_10px_20px_rgba(249,115,22,0.35)] grid place-items-center"
          >
            <Brain size={30} color='white' />
          </div>
  
          {/* Heading */}
          <h1 className="text-2xl font-semibold tracking-tight text-brand-900 dark:text-neutral-100">
            Let's Analyze
          </h1>
  
          {/* Subtext */}
          <p className="mt-3 max-w-xl text-balance text-brand-800/80 dark:text-neutral-400 mx-auto">
            Upload your meeting content and click analyze to get AI-powered insights, summaries, and action items.
          </p>
        </div>
      </div>
    );
  }
  