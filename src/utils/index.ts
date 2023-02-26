export function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    let p = new Intl.DateTimeFormat("en", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    })
        .formatToParts(date)
        .reduce((acc: any, part) => {
            acc[part.type] = part.value;
            return acc;
        }, {});

    return `${p.year}-${p.month}-${p.day} ${p.hour}:${p.minute}:${p.second}`;
}

export function formatNumber(number: number) {
    return number.toLocaleString("ko-KR");
}

export function roundNumber(number: number) {
    return Math.round(number * 100) / 100;
}
