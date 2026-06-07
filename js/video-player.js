(function () {
    var QUALITIES = [
        { id: '720p', label: '720p (padrão)' },
        { id: '1080p', label: '1080p (HD)' }
    ];

    function getSource(container, quality) {
        return container.getAttribute('data-src' + quality);
    }

    function initPlayer(container) {
        var video = container.querySelector('video');
        if (!video) return;

        var defaultQuality = container.getAttribute('data-default-quality') || '720p';
        var qualitySelect = container.querySelector('.video-quality-select');
        var captionsBtn = container.querySelector('.video-captions-btn');
        var track = video.querySelector('track[kind="subtitles"]');

        function setQuality(quality, resumeTime, options) {
            options = options || {};
            var src = getSource(container, quality);
            if (!src) return;

            var wasPlaying = !video.paused && !video.ended;
            var time = resumeTime != null ? resumeTime : video.currentTime;
            var captionsOn = options.captionsOn;

            if (captionsOn === undefined && track && track.track) {
                captionsOn = track.track.mode === 'showing';
            }

            if (video.getAttribute('src') !== src) {
                video.src = src;
                video.load();
            }

            function onReady() {
                if (time > 0 && isFinite(video.duration) && time < video.duration) {
                    video.currentTime = time;
                }
                if (captionsOn !== undefined) {
                    setCaptions(captionsOn);
                }
                if (wasPlaying) {
                    video.play().catch(function () {});
                }
            }

            if (video.readyState >= 1) {
                onReady();
            } else {
                video.addEventListener('loadedmetadata', onReady, { once: true });
            }

            if (qualitySelect) {
                qualitySelect.value = quality;
            }
        }

        function setCaptions(enabled) {
            if (!track || !track.track) return;

            track.track.mode = enabled ? 'showing' : 'hidden';

            if (captionsBtn) {
                captionsBtn.setAttribute('aria-pressed', enabled ? 'true' : 'false');
                captionsBtn.textContent = enabled ? 'Legendas: Ligadas' : 'Legendas: Desligadas';
            }
        }

        if (qualitySelect) {
            qualitySelect.innerHTML = '';
            QUALITIES.forEach(function (q) {
                if (!getSource(container, q.id)) return;
                var option = document.createElement('option');
                option.value = q.id;
                option.textContent = q.label;
                qualitySelect.appendChild(option);
            });

            qualitySelect.addEventListener('change', function () {
                setQuality(qualitySelect.value);
            });
        }

        if (captionsBtn) {
            captionsBtn.addEventListener('click', function () {
                var showing = track && track.track && track.track.mode === 'showing';
                setCaptions(!showing);
            });
        }

        var startQuality = getSource(container, defaultQuality) ? defaultQuality : '720p';
        setQuality(startQuality, 0, { captionsOn: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            document.querySelectorAll('[data-video-player]').forEach(initPlayer);
        });
    } else {
        document.querySelectorAll('[data-video-player]').forEach(initPlayer);
    }
})();
