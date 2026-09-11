import { ShieldAlert } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-parchment-200 bg-parchment-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="ornament-line mb-8" />

        <div className="text-center space-y-4">
          <p className="font-display text-xl font-semibold text-navy-700">
            Powered by AI + Historical Knowledge + Interactive Learning
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-navy-500">
            <ShieldAlert className="w-4 h-4 text-terracotta-500" />
            <span>
              Historical information should be verified with authoritative sources before publication.
            </span>
          </div>

          <div className="ornament-line mt-8" />

          <p className="text-xs text-navy-400 pt-4">
            AI Heritage Storyteller — A college research prototype under the theme
            "Humanities, Language & Fine Arts." Prototype content is labeled where used.
          </p>
        </div>
      </div>
    </footer>
  );
}
