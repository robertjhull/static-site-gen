const getCurrentDateTimeStr = () => {
    const today = new Date();
    const date = `${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}`;
    const hours = today.getHours();
    if (hours > 12) {
        return `${date} ${hours - 12}:${today.getMinutes()}PM`;
    } else {
        return `${date} ${hours}:${today.getMinutes()}AM`;
    }
}

module.exports = { getCurrentDateTimeStr }