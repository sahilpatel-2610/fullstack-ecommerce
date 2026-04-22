
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { useNavigate } from "react-router-dom";

const DashboardBox = (props) => {
    const navigate = useNavigate();

    return (
        <div className="dashboardBox"
            onClick={() => props.path && navigate(props.path)}
            style={{
                backgroundImage:
                    `linear-gradient(to right, ${props.color?.[0]}, ${props.color?.[1]})`,
                cursor: props.path ? 'pointer' : 'default'
            }}>


            {
                props.grow === true ?

                    <span className="chart"><TrendingUpIcon /></span>

                    :

                    <span className="chart"><TrendingDownIcon /></span>

            }

            <div className="d-flex w-100 align-items-center">
                <div className="col1 flex-grow-1">
                    <h4 className="text-white mb-0">{props.title ? props.title : "Total Users"}</h4>
                    <span className="text-white">{props.count !== undefined ? props.count : 0}</span>
                </div>

                <div className="ms-auto d-flex flex-column align-items-center">
                    {
                        props.icon ?
                            <span className="icon">
                                {props.icon ? props.icon : ''}
                            </span>

                            :

                            ''
                    }



                </div>
            </div>

        </div>
    )
}

export default DashboardBox;


