import type { Metadata } from 'next'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { HelpCircle, BookOpen, Bell, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Student Corner',
  description:
    'Resources for students including FAQs, career guidance articles, admission updates, and important notifications.',
}

const faqs = [
  {
    question: 'What is the last date for admission?',
    answer:
      'Admission dates vary by course and college. Most colleges accept applications until August for the current academic year. However, we recommend applying as early as possible to secure your seat. Contact us for specific deadlines for your chosen course.',
  },
  {
    question: 'Can I apply for multiple courses?',
    answer:
      'Yes, you can apply for multiple courses simultaneously. This increases your chances of securing admission. Our counsellors will help you prioritize your applications based on your preferences and eligibility.',
  },
  {
    question: 'Is hostel facility available through partner colleges?',
    answer:
      'Yes, most of our partner colleges offer hostel facilities for both boys and girls. Hostel availability, fees, and amenities vary by institution. We provide detailed information about hostel facilities during the counselling process.',
  },
  {
    question: 'Do you assist with scholarship applications?',
    answer:
      'Absolutely! We provide comprehensive scholarship guidance including eligibility assessment, application assistance, and documentation support for both government and private scholarships. We help you maximize your chances of securing financial aid.',
  },
  {
    question: 'What documents are required for admission?',
    answer:
      'Common documents include 10th & 12th marksheets and certificates, Aadhar card, passport photos, caste certificate (if applicable), and income certificate. Specific requirements may vary by course. Visit our Admission page for a complete checklist.',
  },
  {
    question: 'Are there any fees for your counselling services?',
    answer:
      'Our initial career counselling and course guidance sessions are completely free. We only charge a nominal service fee once you decide to proceed with admission through us, which covers application processing, documentation, and follow-up support.',
  },
  {
    question: 'Can students from other states apply?',
    answer:
      'Yes, we assist students from all states across India. Many of our partner colleges welcome students from different states. We help with all interstate documentation including migration certificates and domicile requirements.',
  },
  {
    question: 'How long does the admission process take?',
    answer:
      'The typical admission process takes 2-4 weeks from application submission to admission confirmation, depending on the college and course. We ensure timely follow-up at every stage to expedite the process.',
  },
  {
    question: 'Do you provide education loan assistance?',
    answer:
      'Yes, we have partnerships with leading banks and help students with education loan applications, documentation, and approval processes. We guide you through various loan options and help you choose the best one based on your needs.',
  },
  {
    question: 'What courses are most popular this year?',
    answer:
      'Currently, B.Sc Nursing, B.Tech (CSE and AI/ML), B.Pharm, and MBA are among the most sought-after courses. However, the best course for you depends on your individual interests, aptitude, and career goals. Our counsellors help you make an informed decision.',
  },
]

const admissionUpdates = [
  {
    date: '2026-03-20',
    title: 'B.Tech Admissions Open',
    description: 'Applications now open for B.Tech across all specializations for 2026-27 batch',
    badge: 'New',
  },
  {
    date: '2026-03-15',
    title: 'Nursing Entrance Exam Dates',
    description: 'B.Sc Nursing entrance exams scheduled for April 2026. Registration deadline: March 31',
    badge: 'Important',
  },
  {
    date: '2026-03-10',
    title: 'Scholarship Applications',
    description: 'State government scholarship portal now accepting applications until April 15',
    badge: 'Deadline',
  },
  {
    date: '2026-03-05',
    title: 'Free Career Counselling Week',
    description: 'Special career guidance sessions for 12th pass students. Book your slot now!',
    badge: 'Event',
  },
  {
    date: '2026-02-28',
    title: 'MBA Admissions Extended',
    description: 'MBA admission deadline extended to March 31, 2026 for select colleges',
    badge: 'Extended',
  },
]

export default function StudentCornerPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-primary to-brand-primary/80 text-white py-16">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-serif mb-6">Student Corner</h1>
            <p className="text-lg text-white/90">
              Your one-stop resource hub for FAQs, career guidance, admission updates, and important
              notifications
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 bg-brand-light border-b border-neutral-200">
        <div className="section-container">
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#faqs" className="flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-neutral-200 hover:border-brand-secondary transition-colors">
              <HelpCircle className="w-4 h-4 text-brand-secondary" />
              <span className="text-sm font-semibold text-neutral-900">FAQs</span>
            </a>
            <a href="#guidance" className="flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-neutral-200 hover:border-brand-secondary transition-colors">
              <BookOpen className="w-4 h-4 text-brand-secondary" />
              <span className="text-sm font-semibold text-neutral-900">Career Guidance</span>
            </a>
            <a href="#updates" className="flex items-center gap-2 px-6 py-3 bg-white rounded-full border border-neutral-200 hover:border-brand-secondary transition-colors">
              <Bell className="w-4 h-4 text-brand-secondary" />
              <span className="text-sm font-semibold text-neutral-900">Admission Updates</span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs" className="py-16 bg-white scroll-mt-16">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-brand-primary mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-neutral-600">
              Find answers to common questions about admissions, courses, and our services
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-brand-light rounded-xl border border-neutral-200 overflow-hidden"
              >
                <summary className="px-6 py-4 cursor-pointer list-none flex items-center justify-between hover:bg-white transition-colors">
                  <div className="flex items-start gap-4">
                    <HelpCircle className="w-5 h-5 text-brand-secondary flex-shrink-0 mt-0.5" />
                    <span className="font-semibold text-neutral-900">{faq.question}</span>
                  </div>
                  <svg
                    className="w-5 h-5 text-neutral-600 group-open:rotate-180 transition-transform flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-4 pl-15 text-neutral-700 text-sm">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Career Guidance Articles */}
      <section id="guidance" className="py-16 bg-brand-light scroll-mt-16">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-brand-primary mb-4">Career Guidance</h2>
            <p className="text-neutral-600">
              Expert articles and resources to help you make informed career decisions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Link
              href="/blog"
              className="bg-white rounded-xl p-6 border border-neutral-200 hover:border-brand-secondary transition-all hover:shadow-md"
            >
              <TrendingUp className="w-8 h-8 text-brand-secondary mb-4" />
              <h3 className="font-semibold text-neutral-900 mb-2">
                Career After 12th: Top Options for Science Students
              </h3>
              <p className="text-sm text-neutral-600 mb-4">
                Explore the best career paths for science students including engineering, medicine,
                and emerging fields.
              </p>
              <span className="text-sm text-brand-secondary font-semibold">Read More →</span>
            </Link>

            <Link
              href="/blog"
              className="bg-white rounded-xl p-6 border border-neutral-200 hover:border-brand-secondary transition-all hover:shadow-md"
            >
              <BookOpen className="w-8 h-8 text-brand-secondary mb-4" />
              <h3 className="font-semibold text-neutral-900 mb-2">
                Complete Guide to B.Sc Nursing Admission
              </h3>
              <p className="text-sm text-neutral-600 mb-4">
                Everything you need to know about B.Sc Nursing admissions, eligibility, and career
                prospects in West Bengal.
              </p>
              <span className="text-sm text-brand-secondary font-semibold">Read More →</span>
            </Link>

            <Link
              href="/blog"
              className="bg-white rounded-xl p-6 border border-neutral-200 hover:border-brand-secondary transition-all hover:shadow-md"
            >
              <HelpCircle className="w-8 h-8 text-brand-secondary mb-4" />
              <h3 className="font-semibold text-neutral-900 mb-2">
                Engineering vs Diploma: Which is Right For You?
              </h3>
              <p className="text-sm text-neutral-600 mb-4">
                Compare engineering degrees and diploma courses to make the best choice for your
                career goals.
              </p>
              <span className="text-sm text-brand-secondary font-semibold">Read More →</span>
            </Link>
          </div>

          <div className="text-center mt-8">
            <Button href="/blog" variant="outline" size="lg">
              View All Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Admission Updates */}
      <section id="updates" className="py-16 bg-white scroll-mt-16">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif text-brand-primary mb-4">Latest Admission Updates</h2>
            <p className="text-neutral-600">
              Stay informed about important admission deadlines, entrance exams, and announcements
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {admissionUpdates.map((update, index) => (
              <div
                key={index}
                className="bg-brand-light rounded-xl p-6 border-l-4 border-brand-secondary"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-brand-secondary" />
                    <h3 className="font-semibold text-neutral-900">{update.title}</h3>
                  </div>
                  <Badge variant="secondary" className="text-xs whitespace-nowrap">
                    {update.badge}
                  </Badge>
                </div>
                <p className="text-sm text-neutral-700 mb-2">{update.description}</p>
                <p className="text-xs text-neutral-500">
                  {new Date(update.date).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-brand-secondary text-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-serif mb-4">Still Have Questions?</h2>
            <p className="text-lg text-white/90 mb-8">
              Our counselling team is here to help. Get personalized guidance for your career and
              admission queries.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="/contact"
                variant="outline"
                size="lg"
                className="bg-white text-brand-secondary border-white hover:bg-white/90"
              >
                Contact Us
              </Button>
              <Button
                href="/admission"
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
