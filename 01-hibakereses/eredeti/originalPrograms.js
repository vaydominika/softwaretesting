// Original teaching examples, intentionally defective. Do not use in production.
// Source: University of Miskolc, Institute of Information Science.
// https://edu.iit.uni-miskolc.hu/tanszek:oktatas:hiba_felismeres_kodban
// Licensed by the source under CC BY-SA 4.0. Only export declarations were added.

export function calculateDiscountedPrice(orderValue, isVip) {
    let discount = 0;
    if (orderValue > 10000 && orderValue < 25000) {
        discount = 0.05;
    } else if (orderValue >= 25000 && orderValue <= 50000) {
        discount = 0.10;
    } else if (orderValue > 50000) {
        discount = 0.15;
    }
    if (isVip === true) {
        discount += 5;
    }
    if (discount > 0.20) {
        discount = 0.20;
    }
    return orderValue - discount;
}

export function calculateParkingFee(minutes, isWeekend, isVip) {
    if (minutes < 15) {
        return 0;
    }
    let hours = Math.floor(minutes / 60);
    let fee = hours * 600;
    if (isWeekend) {
        fee = fee * 0.5;
    }
    if (isVip) {
        fee = fee - 20;
    }
    if (fee > 5000) {
        fee = 5000;
    }
    return fee;
}

export function calculateTicketPrice(age, isStudent, is3D) {
    let price = 3000;
    if (age <= 6) {
        price = 0;
    } else if (age < 18) {
        price = price * 0.7;
    } else if (age > 65) {
        price = price * 0.6;
    }
    if (isStudent) {
        price = price * 0.8;
    }
    if (is3D) {
        price = price * 1.8;
    }
    return price;
}

export function calculateGrade(theory, practice) {
    let total = theory + practice;
    if (theory < 30 && practice < 20) {
        return 1;
    }
    if (total < 50) {
        return 1;
    } else if (total <= 60) {
        return 2;
    } else if (total <= 70) {
        return 3;
    } else if (total <= 85) {
        return 4;
    } else {
        return 5;
    }
}

export function classifyPackage(weight, length, width, height) {
    if (weight < 2 &&
        length < 30 &&
        width < 30 &&
        height < 30) {
        return "SMALL";
    }
    if (weight <= 10 &&
        (length <= 60 || width <= 60 || height <= 60)) {
        return "MEDIUM";
    }
    if (weight <= 30 &&
        length <= 120 &&
        width <= 120 &&
        height <= 120) {
        return "LARGE";
    }
    return "OVERSIZE";
}
