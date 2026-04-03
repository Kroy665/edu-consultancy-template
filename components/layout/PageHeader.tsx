interface PageHeaderProps {
  title: string
  subtitle?: string
  variant?: 'gradient' | 'navy' | 'primary'
}

export function PageHeader({ title, subtitle, variant = 'gradient' }: PageHeaderProps) {
  return (
    <section className="bg-gradient-to-br from-brand-navy via-brand-primary to-brand-navy text-white py-24 relative overflow-hidden animate-gradient">
      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-96 h-96 bg-brand-secondary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-brand-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-6 leading-tight">
            {variant === 'gradient' ? (
              <span className="gradient-text drop-shadow-lg">{title}</span>
            ) : (
              <span className="text-white drop-shadow-lg">{title}</span>
            )}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl text-white/95 font-medium">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  )
}
