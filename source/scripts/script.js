document.addEventListener("DOMContentLoaded", function () {
    // Получаем все модальные окна
    const modals = document.querySelectorAll(".modal");

    modals.forEach((modal) => {
        // Когда модальное окно открывается
        modal.addEventListener("shown.bs.modal", function () {
            const video = modal.querySelector("video");
            if (video) {
                console.log("Show");
                video.pause();
                video.currentTime = 0;
                video.play();
            }
        });

        // Когда модальное окно закрывается
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
