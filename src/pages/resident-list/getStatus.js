function getStatus(payment) {
    const current = new Date();
    const years = current.getFullYear() - payment.getFullYear();
    const months = (years * 12) + current.getMonth() - payment.getMonth();
    if (months === 0) {
        return "MIGS";
    }
    if (months >= 3) {
        return "DELINQUENT";
    }
    return "DUE";
}

export default getStatus;