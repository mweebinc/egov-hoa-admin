function getStatusColor(status) {
    switch (status) {
        case "MIGS":
            return "text-bg-success";
        case "DUE":
            return "text-bg-warning";
        case "DELINQUENT":
            return "text-bg-danger";
        default:
            return "";
    }
}

export default getStatusColor;