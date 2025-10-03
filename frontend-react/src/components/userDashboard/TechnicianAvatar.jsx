import { Avatar, Tooltip } from 'antd';
import { useNavigate } from 'react-router-dom';

const TechnicianAvatar = ({ technician }) => {
    const navigate = useNavigate()
    function handleClick() {
        navigate(`../technicians/${technician.id}`)
    }
    return (
        <Tooltip
            title={
                <>
                    <div><strong>{technician.name}</strong></div>
                    <div>{technician.specialization}</div>
                </>
            }
        >
            <Avatar onClick={handleClick} src={technician.avatar} alt={technician.name} />
        </Tooltip>
    );
};

export default TechnicianAvatar;
