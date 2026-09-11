import { useState } from 'react';
import {
  PlusCircle,
  FileText,
  Image,
  BookOpen,
  Headphones,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import type { Contribution } from '@/types';

const typeConfig = {
  story: { label: 'Local Story', icon: FileText, color: 'navy' },
  photo: { label: 'Photo', icon: Image, color: 'teal' },
  history: { label: 'Historical Info', icon: BookOpen, color: 'gold' },
  audio: { label: 'Audio', icon: Headphones, color: 'terracotta' },
} as const;

const mockContributions: Contribution[] = [
  {
    id: 'c1',
    monumentName: 'Qutub Minar',
    contributorName: 'Priya Sharma',
    type: 'story',
    title: 'My grandfather\'s visit to Qutub Minar in 1965',
    description: 'A personal account of visiting the Qutub Minar complex before it was fenced. My grandfather describes the Iron Pillar and the open access to the ruins.',
    status: 'pending',
    date: '2025-09-08',
  },
  {
    id: 'c2',
    monumentName: 'Ajanta Caves',
    contributorName: 'Rahul Deshpande',
    type: 'photo',
    title: 'Rare photo of Cave 1 murals from 1980s',
    description: 'A photograph taken by my father showing the murals of Cave 1 before the most recent restoration work.',
    status: 'pending',
    date: '2025-09-05',
  },
  {
    id: 'c3',
    monumentName: 'Shaniwar Wada',
    contributorName: 'Anjali Patil',
    type: 'history',
    title: 'Marathi records about the 1761 incident',
    description: 'Transcribed family documents referencing the events at Shaniwar Wada in 1761, passed down through generations.',
    status: 'verified',
    date: '2025-08-28',
  },
];

export default function AdminPage() {
  const [contributions, setContributions] = useState<Contribution[]>(mockContributions);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    monumentName: '',
    contributorName: '',
    type: 'story' as Contribution['type'],
    title: '',
    description: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newContribution: Contribution = {
      id: `c${Date.now()}`,
      ...formData,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    };
    setContributions((prev) => [newContribution, ...prev]);
    setSubmitted(true);
    setFormData({
      monumentName: '',
      contributorName: '',
      type: 'story',
      title: '',
      description: '',
    });
    setTimeout(() => {
      setSubmitted(false);
      setShowForm(false);
    }, 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="section-title mb-2">Contribute to Heritage</h1>
        <div className="ornament-line max-w-xs mx-auto" />
        <p className="text-navy-500 mt-4 max-w-2xl mx-auto">
          Share local stories, photos, historical information, or audio recordings.
          All submissions are reviewed before being published.
        </p>
      </div>

      {/* Submit button / form */}
      {!showForm ? (
        <div className="text-center mb-8">
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary inline-flex items-center gap-2"
          >
            <PlusCircle className="w-5 h-5" />
            Submit a Contribution
          </button>
        </div>
      ) : (
        <div className="card p-6 mb-8 animate-fade-in-up">
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-12 h-12 text-teal-500 mx-auto mb-3" />
              <h3 className="font-display text-xl font-semibold text-navy-700 mb-1">
                Submission Received
              </h3>
              <p className="text-navy-500 text-sm">
                Your contribution is now pending verification.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-display text-xl font-semibold text-navy-700 mb-2">
                New Contribution
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy-600 mb-1">
                    Monument / Place
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.monumentName}
                    onChange={(e) => setFormData({ ...formData, monumentName: e.target.value })}
                    placeholder="e.g., Qutub Minar"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-600 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contributorName}
                    onChange={(e) => setFormData({ ...formData, contributorName: e.target.value })}
                    placeholder="Your name"
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-600 mb-1">
                  Contribution Type
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(Object.keys(typeConfig) as Contribution['type'][]).map((t) => {
                    const cfg = typeConfig[t];
                    const Icon = cfg.icon;
                    return (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setFormData({ ...formData, type: t })}
                        className={`flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all ${
                          formData.type === t
                            ? 'border-navy-500 bg-navy-50 text-navy-700'
                            : 'border-parchment-300 text-navy-400 hover:border-navy-300'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-xs font-medium">{cfg.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-600 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Brief title for your contribution"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-navy-600 mb-1">
                  Description
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Share your story, information, or details..."
                  rows={4}
                  className="input-field resize-none"
                />
              </div>

              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn-ghost"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Submit for Review
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* Contributions list */}
      <div>
        <h2 className="font-display text-2xl font-semibold text-navy-700 mb-4">
          Community Contributions
        </h2>

        <div className="space-y-4">
          {contributions.map((c, i) => {
            const cfg = typeConfig[c.type];
            const Icon = cfg.icon;
            return (
              <div
                key={c.id}
                className="card p-5 animate-fade-in-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-${cfg.color}-100 flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 text-${cfg.color}-600`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-display text-lg font-semibold text-navy-700">
                        {c.title}
                      </h3>
                      {c.status === 'pending' && (
                        <span className="badge bg-gold-100 text-gold-700">
                          <Clock className="w-3 h-3 mr-1" />
                          Pending Verification
                        </span>
                      )}
                      {c.status === 'verified' && (
                        <span className="badge bg-teal-100 text-teal-700">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Verified
                        </span>
                      )}
                      {c.status === 'rejected' && (
                        <span className="badge bg-terracotta-100 text-terracotta-700">
                          <XCircle className="w-3 h-3 mr-1" />
                          Rejected
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-navy-500 mb-2">{c.description}</p>
                    <div className="flex flex-wrap gap-3 text-xs text-navy-400">
                      <span>By {c.contributorName}</span>
                      <span>•</span>
                      <span>{c.monumentName}</span>
                      <span>•</span>
                      <span>{cfg.label}</span>
                      <span>•</span>
                      <span>{c.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info note */}
      <div className="mt-8 card p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
        <p className="text-sm text-navy-500">
          <span className="font-medium text-navy-700">Community Participation:</span> This
          feature demonstrates future community-driven heritage documentation. In production,
          contributions would be reviewed by historians and verified against authoritative sources
          before publication.
        </p>
      </div>
    </div>
  );
}
