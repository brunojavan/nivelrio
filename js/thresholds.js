export const riverStatusThresholds = {
    'river-01': {
        normal: { min: 0, max: 0.89 },
        attention: { min: 0.9, max: 1.09 },
        alert: { min: 1.1, max: 1.29 },
        emergency: { min: 1.3, max: Infinity },
        emergencyI: 1.3 * 1.5
    },
    'river-02': {
        normal: { min: 0, max: 1.59 },
        attention: { min: 1.6, max: 1.99 },
        alert: { min: 2, max: 2.29 },
        emergency: { min: 2.3, max: Infinity },
        emergencyI: 2.3 * 1.5
    },
    'river-03': {
        normal: { min: 0, max: 1.47 },
        attention: { min: 1.48, max: 1.84 },
        alert: { min: 1.85, max: 2.49 },
        emergency: { min: 2.5, max: Infinity },
        emergencyI: 2.5 * 1.5
    },
    'river-04': {
        normal: { min: 0, max: 1.49 },
        attention: { min: 1.5, max: 1.84 },
        alert: { min: 1.85, max: 2.24 },
        emergency: { min: 2.25, max: Infinity },
        emergencyI: 2.25 * 1.5
    },
    'river-05': {
        normal: { min: 0, max: 1.43 },
        attention: { min: 1.44, max: 1.79 },
        alert: { min: 1.8, max: 2.49 },
        emergency: { min: 2.5, max: Infinity },
        emergencyI: 2.5 * 1.5
    },
    'river-06': {
        normal: { min: 0, max: 1.49 },
        attention: { min: 1.5, max: 1.84 },
        alert: { min: 1.85, max: 2.24 },
        emergency: { min: 2.25, max: Infinity },
        emergencyI: 2.25 * 1.5
    },
    'river-07': {
        normal: { min: 0, max: 0.69 },
        attention: { min: 0.7, max: 0.98 },
        alert: { min: 0.99, max: 1.29 },
        emergency: { min: 1.3, max: Infinity },
        emergencyI: 1.3 * 1.5
    },
    'river-08': {
        normal: { min: 0, max: 2.49 },
        attention: { min: 2.5, max: 2.99 },
        alert: { min: 3, max: 3.39 },
        emergency: { min: 3.4, max: Infinity },
        emergencyI: 3.4 * 1.5
    },
    'river-09': {
        normal: { min: 0, max: 0.97 },
        attention: { min: 0.98, max: 1.22 },
        alert: { min: 1.23, max: 1.59 },
        emergency: { min: 1.6, max: Infinity },
        emergencyI: 1.6 * 1.5
    },
    'river-10': {
        normal: { min: 0, max: 2.99 },
        attention: { min: 3, max: 5.99 },
        alert: { min: 6, max: 7.99 },
        emergency: { min: 8, max: Infinity },
        emergencyI: 8 * 1.5
    },
    'river-11': {
        normal: { min: 0, max: 2.99 },
        attention: { min: 3, max: 5.99 },
        alert: { min: 6, max: 7.99 },
        emergency: { min: 8, max: Infinity },
        emergencyI: 8 * 1.5
    },
    'river-12': {
        normal: { min: 0, max: 2.99 },
        attention: { min: 3, max: 3.99 },
        alert: { min: 4, max: 5.99 },
        emergency: { min: 6, max: Infinity },
        emergencyI: 6 * 1.5
    },
    'river-13': {
        normal: { min: 0, max: 2.49 },
        attention: { min: 2.5, max: 2.99 },
        alert: { min: 3, max: 3.99 },
        emergency: { min: 4, max: Infinity },
        emergencyI: 4 * 1.5
    },
    'river-14': {
        normal: { min: 0, max: 3.99 },
        attention: { min: 4, max: 5.99 },
        alert: { min: 6, max: 6.99 },
        emergency: { min: 7, max: Infinity },
        emergencyI: 7 * 1.5
    },
    'river-15': {
        normal: { min: 0, max: 2.99 },
        attention: { min: 3, max: 3.99 },
        alert: { min: 4, max: 5.99 },
        emergency: { min: 6, max: Infinity },
        emergencyI: 6 * 1.5
    }
};