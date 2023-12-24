import { riverStatusThresholds } from './thresholds.js';

export function calculateStatusProgress(riverId, currentLevel) {
    const thresholds = riverStatusThresholds[riverId];
    let progress = {
        normal: 0,
        attention: 0,
        alert: 0,
        emergencyI: 0
    };

    for (let status in progress) {
        if (status !== 'emergencyI') {
            if (currentLevel <= thresholds[status].max) {
                if (currentLevel >= thresholds[status].min) {
                    progress[status] = ((currentLevel - thresholds[status].min) / (thresholds[status].max - thresholds[status].min)) * 100;
                }
            } else {
                progress[status] = 100;
            }
        } else {
            if (currentLevel > thresholds.alert.max) {
                progress[status] = ((currentLevel - thresholds.alert.max) / (thresholds[status] - thresholds.alert.max)) * 100;
            }
        }
    }

    return progress;
}

export function calculateThresholdDifferences() {
    let differences = {};

    for (let river in riverStatusThresholds) {
        differences[river] = {};

        for (let status in riverStatusThresholds[river]) {
            if (status !== 'emergency') {
                let min = riverStatusThresholds[river][status].min;
                let max = riverStatusThresholds[river][status].max;
                if (typeof min === 'number' && typeof max === 'number') {
                    differences[river][status] = max - min;
                }
            }
        }
    }

    return differences;
}

export function calculateScales() {
    const differences = calculateThresholdDifferences();
    let scales = {};

    for (let river in differences) {
        scales[river] = {};

        // Calculando a soma das diferenças dos status "normal", "attention" e "alert"
        let sumScale = differences[river].normal + differences[river].attention + differences[river].alert;

        // Calculando as porcentagens das escalas 1, 2 e 3
        scales[river].scale1 = (differences[river].normal / sumScale) * 75;
        scales[river].scale2 = (differences[river].attention / sumScale) * 75;
        scales[river].scale3 = (differences[river].alert / sumScale) * 75;
        
        // A escala 4 é fixa em 25%
        scales[river].scale4 = 25;
    }

    return scales;
}