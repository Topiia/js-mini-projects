/**
 * Background Engine - Manage futuristic weather backgrounds
 */
const BackgroundEngine = (() => {
    const registry = {
        'clear': {
            day: 'sunny_clear',
            night: 'night_clear'
        },
        'clouds': {
            day: 'cloudy_overcast',
            night: 'night_clear'
        },
        'rain': {
            day: 'rain_thunderstorm',
            night: 'rain_thunderstorm'
        },
        'drizzle': {
            day: 'rain_thunderstorm',
            night: 'rain_thunderstorm'
        },
        'thunderstorm': {
            day: 'rain_thunderstorm',
            night: 'rain_thunderstorm'
        },
        'snow': {
            day: 'snow_winter',
            night: 'snow_winter'
        },
        'fog': {
            day: 'fog_mist',
            night: 'fog_mist'
        },
        'mist': {
            day: 'fog_mist',
            night: 'fog_mist'
        },
        'haze': {
            day: 'fog_mist',
            night: 'fog_mist'
        }
    };

    const getDeviceType = () => {
        const width = window.innerWidth;
        if (width < 768) return 'mobile';
        if (width < 1024) return 'tablet';
        return 'desktop';
    };

    const getBackgroundKey = (condition, isNight) => {
        const key = condition.toLowerCase();
        const mapping = registry[key] || registry['clear'];
        return isNight ? mapping.night : mapping.day;
    };

    const update = (condition, isNight = false) => {
        const bgKey = getBackgroundKey(condition, isNight);
        const device = getDeviceType();
        const assetPath = `assets/backgrounds/${bgKey}_${device}.png`;
        
        // Update body class for thematic styling
        document.body.className = ''; 
        document.body.classList.add(`theme-${bgKey}`);

        // Set background with lazy-load pattern
        const tempImg = new Image();
        tempImg.src = assetPath;
        tempImg.onload = () => {
            document.body.style.backgroundImage = `url('${assetPath}')`;
        };
    };

    // Handle resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Trigger refresh if needed (can be optimized to only swap if device type changed)
            if (document.body.dataset.currentCondition) {
                update(document.body.dataset.currentCondition, document.body.dataset.isNight === 'true');
            }
        }, 250);
    });

    return {
        update: (condition, isNight) => {
            document.body.dataset.currentCondition = condition;
            document.body.dataset.isNight = isNight;
            update(condition, isNight);
        }
    };
})();

// Export for use in script.js
window.BackgroundEngine = BackgroundEngine;
