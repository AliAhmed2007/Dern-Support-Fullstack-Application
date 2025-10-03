import { motion } from 'framer-motion'
import { Rate, Avatar } from 'antd'
import { useRef, useState, useEffect } from 'react'
import useTheme from '../../hooks/useTheme'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import reviews from '../../utils/customerReviews'

function CustomerReviews() {
  const { darkMode } = useTheme()
  const [displayReviews] = useState([...reviews, ...reviews])
  const containerRef = useRef(null)
  const scrollContainerRef = useRef(null)

  const handleScroll = (direction) => {
    const container = scrollContainerRef.current
    if (container) {
      const card = container.querySelector('.review-card')
      if (card) {
        const cardWidth = card.offsetWidth
        const gap = 32
        const scrollAmount = (cardWidth + gap) * direction
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
      }
    }
  }

  useEffect(() => {
    const container = scrollContainerRef.current
    const handleScroll = () => {
      if (container) {
        const { scrollLeft, scrollWidth, clientWidth } = container
        const maxScroll = scrollWidth - clientWidth
        if (scrollLeft >= maxScroll - 10) {
          container.scrollTo({ left: 0, behavior: 'auto' })
        }
      }
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={containerRef}
      className={`${darkMode ? 'dark:bg-dark-surface-primary' : 'bg-light-surface-primary'} py-20 px-6 sm:px-10 relative overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'dark:text-dark-primary' : 'text-light-primary'}`}>
            What Our Customers Say
          </h2>
          <p className={`text-lg ${darkMode ? 'dark:text-dark-secondary' : 'text-light-secondary'} max-w-3xl mx-auto`}>
            Discover how our services have transformed businesses and delighted customers worldwide.
            Read their genuine experiences and success stories below.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center -translate-y-1/2 top-1/2 z-50">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleScroll(-1)}
              className={`cursor-pointer h-12 w-12 rounded-full shadow-lg flex items-center justify-center z-10 ${darkMode
                  ? 'bg-dark-surface-secondary text-dark-primary hover:bg-dark-surface-primary'
                  : 'bg-light-surface-secondary text-light-primary hover:bg-light-surface-primary'
                }`}
            >
              <LeftOutlined />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleScroll(1)}
              className={`cursor-pointer h-12 w-12 rounded-full shadow-lg flex items-center justify-center z-10 ${darkMode
                  ? 'bg-dark-surface-secondary text-dark-primary hover:bg-dark-surface-primary'
                  : 'bg-light-surface-secondary text-light-primary hover:bg-light-surface-primary'
                }`}
            >
              <RightOutlined />
            </motion.button>
          </div>

          {/* Cards Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-8 pb-6"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {displayReviews.map((review, index) => (
              <motion.div
                key={`${review.id}-${index}`}
                className="flex-shrink-0 review-card w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.333%-2rem)] snap-always snap-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div
                  className={`p-8 rounded-2xl h-full flex flex-col transition-all duration-250 ${darkMode
                      ? 'dark:bg-dark-surface-secondary dark:shadow-dark-scrolled'
                      : 'bg-light-surface-secondary shadow-light-custom'
                    }`}
                >
                  <div className="mb-4">
                    <Rate
                      disabled
                      defaultValue={review.rating}
                      className={`text-primary ${darkMode ? 'dark:text-dark-accent-color' : 'text-light-accent'}`}
                    />
                  </div>

                  <div className="flex-1 min-h-[150px] mb-6">
                    <p className={`${darkMode ? 'dark:text-dark-secondary' : 'text-light-secondary'}`}>
                      {review.content}
                    </p>
                  </div>

                  <div className={`border-t pt-6 ${darkMode ? 'dark:border-dark-border-default' : 'border-light-border-default'
                    }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className={`font-semibold ${darkMode ? 'dark:text-dark-primary' : 'text-light-primary'}`}>
                          {review.user}
                        </h3>
                        <p className={`text-sm ${darkMode ? 'dark:text-dark-secondary' : 'text-light-secondary'}`}>
                          {review.location}
                        </p>
                      </div>
                      {review.image ? (
                        <Avatar
                          src={review.image}
                          size={56}
                          className="border-2 border-primary/20"
                        />
                      ) : (
                        <Avatar
                          size={56}
                          className={`bg-primary/10 text-primary text-xl border-2 ${darkMode ? 'border-dark-primary/20' : 'border-light-primary/20'
                            }`}
                        >
                          {review.user.charAt(0)}
                        </Avatar>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default CustomerReviews