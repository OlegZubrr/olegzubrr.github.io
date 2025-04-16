document.addEventListener("DOMContentLoaded", function () {
    const modals = document.querySelectorAll(".modal");

    modals.forEach((modal) => {
        modal.addEventListener("shown.bs.modal", function () {
            const video = modal.querySelector("video");
            if (video) {
                console.log("Show");
                video.pause();
                video.currentTime = 0;
                video.play();
            }
        });
        modal.addEventListener("hidden.bs.modal", function () {
            console.log("Close");
            const video = modal.querySelector("video");
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        });
    });
});
document.querySelectorAll(".modal").forEach(function (modal) {
    modal.addEventListener("hidden.bs.modal", function () {
        modal.querySelectorAll("iframe").forEach(function (iframe) {
            iframe.src = iframe.src;
        });
    });
});
