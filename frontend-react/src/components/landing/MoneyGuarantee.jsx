import { motion } from 'framer-motion'
import guaranteeImage from '../../assets/images/MoneyBackGuaranteeFinal.png'
import useTheme from '../../hooks/useTheme'

const features = [
  {
    emoji: '📞',
    title: '24/7 Expert Support',
    description: 'Round-the-clock assistance from our certified technical experts'
  },
  {
    emoji: '🔧',
    title: 'Certified Technicians',
    description: 'Industry-certified professionals with minimum 5 years experience'
  },
  {
    emoji: '✅',
    title: 'Satisfaction Guarantee',
    description: 'Full refund if we can\'t resolve your issue within 72 hours'
  }
]

function MoneyBackGuarantee() {
  const { darkMode } = useTheme()

  const animationProps = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
    viewport: { once: true, margin: "0px 0px -20% 0px" }
  }

  return (
    <section className={`overflow-hidden ${darkMode ? 'dark:bg-dark-background' : 'bg-light-background'} py-20 px-6 sm:px-10`}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        {/* Image Container */}
        <motion.div 
          {...animationProps}
          className="w-full lg:w-1/2 relative order-2 lg:order-1"
        >
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-primary/10 to-secondary/20 dark:from-primary/20 dark:to-secondary/30">
            <img 
              src={guaranteeImage} 
              alt="Money Back Guarantee"
              className="w-full h-auto max-w-[350px] mx-auto object-cover"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Content Container */}
        <motion.div 
          {...animationProps}
          className="w-full lg:w-1/2 order-1 lg:order-2"
        >
          <div className="space-y-8">
            <motion.h2
              {...animationProps}
              className={`text-3xl md:text-4xl font-bold leading-tight ${
                darkMode ? 'dark:text-dark-primary' : 'text-light-primary'
              }`}
            >
              Risk-Free Money Back Guarantee
            </motion.h2>
            
            <motion.div
              {...animationProps}
              className="space-y-6"
            >
              <motion.p
                {...animationProps}
                className={`text-lg leading-relaxed ${
                  darkMode ? 'dark:text-dark-secondary' : 'text-light-secondary'
                }`}
              >
                We're so confident in our technical expertise that we offer a full refund if we 
                can't resolve your issue within 72 hours. Your satisfaction is 100% guaranteed.
              </motion.p>

              <motion.div 
                {...animationProps}
                className="space-y-4"
              >
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className={`flex items-start gap-4 p-4 rounded-xl transition-all ${
                      darkMode 
                        ? 'dark:bg-dark-surface-primary hover:dark:bg-dark-surface-secondary' 
                        : 'bg-light-surface-primary hover:bg-light-surface-secondary'
                    } shadow-scrolled`}
                  >
                    <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                      <span className="text-2xl">{feature.emoji}</span>
                    </div>
                    <div>
                      <h3 className={`font-semibold ${
                        darkMode ? 'dark:text-dark-primary' : 'text-light-primary'
                      }`}>
                        {feature.title}
                      </h3>
                      <p className={`text-sm ${
                        darkMode ? 'dark:text-dark-secondary' : 'text-light-secondary'
                      }`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default MoneyBackGuarantee