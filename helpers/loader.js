import CircularProgress from "@mui/material/CircularProgress";

const Loader = ({full}) => (
    <div className={`root_loader ${full ? 'full':''}`}>
        <CircularProgress/>
    </div>
)

export default Loader;