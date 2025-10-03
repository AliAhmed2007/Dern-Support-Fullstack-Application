import { motion } from 'framer-motion';

function AssignTechnicianBtn({ isAdmin, repairStatus, setSelectedRepairId, repairRequestId }) {
    const handleClick = (e) => {
        e?.stopPropagation()
        setSelectedRepairId(repairRequestId);
    };
    return isAdmin && repairStatus !== 'cancelled' ? (
        <motion.button
            onClick={e => handleClick(e)}
            className="cursor-pointer px-3 py-1.5 bg-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            whileHover={{
                scale: 1.05,
                backgroundColor: "#3b82f6",
                boxShadow: "0 5px 10px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
            }}
            whileTap={{
                scale: 0.95,
                backgroundColor: "#1d4ed8"
            }}
            initial={{
                opacity: 0,
                y: 10
            }}
            animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.3 }
            }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Assign
        </motion.button>
    ) : repairStatus === 'cancelled' ? (
        <span className="text-red-500 text-nowrap">Cancelled Request</span>
    ) : (
        <span className="text-gray-500 text-nowrap">Not Assigned</span>
    );
}

export default AssignTechnicianBtn;