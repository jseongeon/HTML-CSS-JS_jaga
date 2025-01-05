$(document).ready(function () {
    const totalSteps = 4; // 총 단계 수
    let currentIndex = 0; // 현재 단계 인덱스

    const $divs = $(".frame > .real > .selfmade"); // 화면 구간들
    const $progressContainer = $("#progress-container"); // 진행 바 컨테이너
    const $progressText = $("#progress-text"); // 단계 텍스트
    const $progressBar = $("#progress-bar"); // 진행 바
    const $contactInput = $('.real_input_box input[name="contact"]'); // 네 번째 화면의 input

    // 단계에 맞게 화면과 게이지바를 업데이트
    const updateProgress = () => {
        // 화면 업데이트
        $divs.each((index, div) => {
            $(div).toggle(index === currentIndex);
        });

        // 두 번째 화면부터 게이지바 표시
        if (currentIndex > 0) {
            $progressContainer.show();
            $progressText.text(`${currentIndex}/${totalSteps - 1}`); // 단계 표시
            $progressBar.css("width", `${(currentIndex / (totalSteps - 1)) * 100}%`);
        } else {
            $progressContainer.hide();
        }
    };

    // 초기화: 첫 번째 화면만 표시
    updateProgress();

    // 첫 번째 화면 → 두 번째 화면
    $(".botton1").on("click", function () {
        if (currentIndex < totalSteps - 1) {
            currentIndex++;
            updateProgress();
        }
    });

    // 두 번째 화면 → 세 번째 화면
    $(".radio-item input").on("change", function () {
        if (currentIndex < totalSteps - 1) {
            currentIndex++;
            updateProgress();

            // 세 번째 화면에서 선택된 라디오 버튼 값 확인
            if (currentIndex === 3) {
                const selectedValue = $('input[name="category"]:checked').val();
                if (selectedValue === "전화상담" || selectedValue === "문자상담") {
                    $contactInput.attr("placeholder", "전화번호를 입력해주세요");
                } else if (selectedValue === "카카오톡상담") {
                    $contactInput.attr("placeholder", "카카오톡 ID 혹은 전화번호를 입력해주세요");
                } else if (selectedValue === "이메일상담") {
                    $contactInput.attr("placeholder", "이메일 주소를 입력해주세요");
                }
            }
        }
    });

    // 뒤로 가기 버튼
    $("#back-button").on("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
            updateProgress();
        }
    });

    // 드롭다운 기능
    const $selectedOption = $("#selectedOption");
    const $options = $("#options");
    const $customOptions = $(".custom-option");

    const updateSelectedOption = (imgSrc, text) => {
        $selectedOption.find("img").attr("src", imgSrc);
        $selectedOption.find("span").remove();
        $selectedOption.append(`<span>${text}</span>`);
    };

    $selectedOption.on("click", function () {
        const isVisible = $options.is(":visible");
        $options.toggle(!isVisible);

        $customOptions.each((_, option) => {
            const $option = $(option);
            const isSelected = $option.find("img").attr("src") === $selectedOption.find("img").attr("src");
            $option.toggle(!isSelected);
        });
    });

    $customOptions.on("click", function () {
        const imgSrc = $(this).find("img").attr("src");
        const text = $(this).text().trim();

        updateSelectedOption(imgSrc, text);
        $options.hide();
    });

    $(document).on("click", function (e) {
        if (!$(e.target).closest(".input_box").length) {
            $options.hide();
        }
    });
});
