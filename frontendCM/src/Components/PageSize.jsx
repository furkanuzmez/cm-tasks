import {
    Select,
    MenuItem,
    FormControl
} from "@mui/material";

const PageSize = ({ pageSize, setPageSize }) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px' }}>
            <span style={{ marginRight: '8px', lineHeight: '16px' }}>Show</span>
            <FormControl  style={{ minWidth: '80px', marginRight: '8px', height: '24px' }}>
                <Select
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                    style={{ height: '24px', lineHeight: '24px', }}
                >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                </Select>
            </FormControl>
            <span style={{ lineHeight: '16px' }}>Entries</span>
        </div>
    );
};

export default PageSize;
