import { motion } from "framer-motion"
import { Button, Spin } from 'antd';
import { useNavigation } from 'react-router-dom';

function SubmitRequestBtn() {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 },
    };

    return (
        <motion.div variants={itemVariants} className="flex justify-end">
            <Button
                type="primary"
                size="large"
                htmlType="submit"
                disabled={isSubmitting}
            >
                {isSubmitting && <Spin size="small" className="mr-2" />}
                {isSubmitting ? 'Submitting...' : 'Submit Repair Request'}
            </Button>
        </motion.div>
    )
}

export default SubmitRequestBtn