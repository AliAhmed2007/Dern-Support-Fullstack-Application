import { useState} from 'react';
import { useNavigate} from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, Button, Badge, Divider, Switch, notification } from 'antd';
import { CheckCircleOutlined, RocketOutlined, LaptopOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import useTheme from '../hooks/useTheme';

const plans = [
    {
        id: 'basic',
        name: 'Basic Support',
        monthlyPrice: 29.99,
        annualPrice: 299.90,
        features: [
            'Email support within 24 hours',
            'Access to knowledge base',
            'Monthly system check',
            'Remote diagnostics'
        ]
    },
    {
        id: 'professional',
        name: 'Professional Support',
        monthlyPrice: 59.99,
        annualPrice: 599.90,
        isPopular: true,
        features: [
            'Priority email & phone support',
            'Full access to knowledge base',
            'Weekly system check',
            'Remote diagnostics & repair',
            'Quarterly performance optimization'
        ]
    },
    {
        id: 'enterprise',
        name: 'Enterprise Support',
        monthlyPrice: 129.99,
        annualPrice: 1299.90,
        features: [
            '24/7 dedicated support team',
            'Complete system management',
            'Daily system checks',
            'Advanced remote troubleshooting',
            'Monthly performance optimization',
            'Security audits & monitoring'
        ]
    }
]


export default function PlansSubscriptions() {
    const [isAnnual, setIsAnnual] = useState(false);
    const { darkMode } = useTheme(); // Using the local hook
    const navigate = useNavigate();

    const handleSubscribe = (planId) => {
        // In a real app, this would navigate to a checkout page or process
        notification.success({
            message: 'Subscription Selected',
            description: `You've selected the ${planId} plan. Redirecting to checkout...`,
            placement: 'topRight',
        });

        // Simulate navigation to checkout
        setTimeout(() => {
            navigate(`/checkout/${planId}?billing=${isAnnual ? 'annual' : 'monthly'}`);
        }, 1500);
    };

    return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
            {/* Hero Section */}
            <motion.section
                className="py-20 px-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <motion.div
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                        IT Support that Works for You
                    </h1>
                    <p className={`text-xl max-w-3xl mx-auto mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Flexible plans designed to provide the technical support your business needs, when you need it.
                    </p>

                    <div className="flex justify-center gap-4 items-center flex-col">
                        <Switch
                            className="mx-4"
                            checked={isAnnual}
                            onChange={setIsAnnual}
                            checkedChildren="Annual"
                            unCheckedChildren="Monthly"
                        />
                        <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                            <Badge className="ml-1" count="Save 20%" style={{ backgroundColor: '#52c41a' }} /> with Annual subscription
                        </span>
                    </div>
                </motion.div>
            </motion.section>

            {/* Subscription Plans */}
            <section id="plans" className="max-w-7xl mx-auto px-4 pb-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {plans.map((plan, index) => (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                                className="flex"
                            >
                                <Card
                                    className={`w-full ${darkMode
                                        ? 'bg-gray-800 border-gray-700'
                                        : 'bg-white border-gray-200'
                                        } ${plan.isPopular ? 'border-blue-500 border-2' : ''}`}
                                    title={
                                        <div className="flex justify-between items-center">
                                            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                                {plan.name}
                                            </h3>
                                            {plan.isPopular && (
                                                <Badge.Ribbon text="Popular" color="blue" />
                                            )}
                                        </div>
                                    }
                                    hoverable
                                >
                                    <div className="text-center mb-6">
                                        <div className={`text-3xl font-bold mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                                            ${isAnnual ? plan.annualPrice.toFixed(2) : plan.monthlyPrice.toFixed(2)}
                                            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                                {isAnnual ? '/year' : '/month'}
                                            </span>
                                        </div>
                                        {isAnnual && (
                                            <p className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                                                Save ${(plan.monthlyPrice * 12 - plan.annualPrice).toFixed(2)} per year
                                            </p>
                                        )}
                                    </div>

                                    <Divider className={darkMode ? 'bg-gray-700' : 'bg-gray-200'} />

                                    <ul className="mb-6 space-y-3">
                                        {plan.features.map((feature, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.3 + (i * 0.1) }}
                                                className="flex items-start"
                                            >
                                                <CheckCircleOutlined className={`mt-1 mr-2 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                                                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                                                    {feature}
                                                </span>
                                            </motion.li>
                                        ))}
                                    </ul>

                                    <Button
                                        type="primary"
                                        size="large"
                                        block
                                        onClick={() => handleSubscribe(plan.id)}
                                        className={plan.isPopular ? 'bg-blue-500 hover:bg-blue-600' : ''}
                                        icon={plan.isPopular ? <RocketOutlined /> : null}
                                    >
                                        Subscribe Now
                                    </Button>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </section>

            {/* Features Section */}
            <section className={`py-16 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            Why Choose Dern-Support?
                        </h2>
                        <p className={`max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Our technical support delivers rapid solutions to keep your business running smoothly.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
                        >
                            <LaptopOutlined className={`text-4xl mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Expert Technicians</h3>
                            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                                Our team of certified IT professionals has the expertise to solve your technical problems quickly and efficiently.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                            className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
                        >
                            <RocketOutlined className={`text-4xl mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Fast Response Times</h3>
                            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                                We understand that downtime costs money. Our support team responds quickly to get you back up and running.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}
                            className={`p-6 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-white'}`}
                        >
                            <CustomerServiceOutlined className={`text-4xl mb-4 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                            <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>24/7 Availability</h3>
                            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                                Technical issues don't follow a 9-to-5 schedule. Our enterprise plans offer round-the-clock support.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <motion.section
                className="py-20 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Ready to get started with professional IT support?
                    </h2>
                    <p className={`text-xl mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Choose the plan that fits your needs and transform your IT experience today.
                    </p>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            type="primary"
                            size="large"
                            onClick={() => document.getElementById('plans').scrollIntoView({ behavior: 'smooth' })}
                            className="px-8 h-12 text-lg"
                        >
                            View Plans
                        </Button>
                    </motion.div>
                </div>
            </motion.section>
        </div>
    );
}
