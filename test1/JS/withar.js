document.addEventListener("DOMContentLoaded", () => {
    let diagnoseButton = document.querySelector(".botton1"); // 첫 화면 버튼
    let categoryRadios = document.querySelectorAll(".radio-item input"); // 두 번째 화면 라디오 버튼
    let divs = document.querySelectorAll(".frame > .real > .selfmade"); // 화면 구간들
    let contactInput = document.querySelector('.real_input_box input[name="contact"]'); // 네 번째 화면의 input
    let backButton = document.getElementById("back-button"); // 뒤로 가기 버튼
    let progressText = document.getElementById("progress-text"); // 단계 텍스트
    let progressBar = document.getElementById("progress-bar"); // 진행 바
    let totalSteps = 4; // 총 단계 수
    let currentIndex = 0; // 현재 단계 인덱스

    // 단계에 맞게 화면과 게이지바를 업데이트
    let updateProgress = () => {
        // 화면 업데이트
        divs.forEach((div, index) => {
            div.style.display = index === currentIndex ? "block" : "none";
        });

        // 두 번째 화면부터 게이지바 표시
        if (currentIndex > 0) {
            document.getElementById("progress-container").style.display = "block";
            progressText.textContent = `${currentIndex}/${totalSteps - 1}`; // 단계 표시
            progressBar.style.width = `${(currentIndex / (totalSteps - 1)) * 100}%`;
        } else {
            document.getElementById("progress-container").style.display = "none";
        }
    };

    // 초기화: 첫 번째 화면만 표시
    updateProgress();

    // 첫 번째 화면 → 두 번째 화면
    diagnoseButton.addEventListener("click", () => {
        if (currentIndex < totalSteps - 1) {
            currentIndex++;
            updateProgress();
        }
    });

    // 두 번째 화면 → 세 번째 화면
    categoryRadios.forEach((radio) => {
        radio.addEventListener("change", () => {
            if (currentIndex < totalSteps - 1) {
                currentIndex++;
                updateProgress();

                // 세 번째 화면에서 선택된 라디오 버튼 값 확인
                if (currentIndex === 3) {
                    let selectedRadio = document.querySelector('input[name="category"]:checked');
                    if (selectedRadio) {
                        if (selectedRadio.value === "전화상담" || selectedRadio.value === "문자상담") {
                            contactInput.placeholder = "전화번호를 입력해주세요";
                        } else if (selectedRadio.value === "카카오톡상담") {
                            contactInput.placeholder = "카카오톡 ID 혹은 전화번호를 입력해주세요";
                        } else if (selectedRadio.value === "이메일상담") {
                            contactInput.placeholder = "이메일 주소를 입력해주세요";
                        }
                    }
                }
            }
        });
    });

    // 뒤로 가기 버튼
    backButton.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateProgress();
        }
    });

    // 드롭다운 기능 (기존 코드 유지)
    let selectedOption = document.getElementById("selectedOption");
    let options = document.getElementById("options");
    let customOptions = document.querySelectorAll(".custom-option");

    let updateSelectedOption = (imgSrc, text) => {
        selectedOption.querySelector("img").src = imgSrc;
        selectedOption.querySelector("span")?.remove();
        selectedOption.insertAdjacentHTML("beforeend", `<span>${text}</span>`);
    };

    selectedOption.addEventListener("click", () => {
        let isVisible = options.style.display === "block";
        options.style.display = isVisible ? "none" : "block";

        customOptions.forEach((option) => {
            let isSelected = option.querySelector("img").src === selectedOption.querySelector("img").src;
            option.style.display = isSelected ? "none" : "flex";
        });
    });

    customOptions.forEach((option) => {
        option.addEventListener("click", () => {
            let imgSrc = option.querySelector("img").src;
            let text = option.textContent.trim();

            updateSelectedOption(imgSrc, text);
            options.style.display = "none";
        });
    });

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".input_box")) {
            options.style.display = "none";
        }
    });
    document.getElementById("myTextArea").placeholder = 
  "ex) 해외 거주중입니다.\nex) 해외 출원까지 관심 있습니다.";
  
  let clicktext = document.getElementById("more-placeholder"); // 클릭 가능한 텍스트
  let textArea = document.getElementById("myTextArea"); // 숨겨진 입력창

  clicktext.addEventListener("click", () => {
    clicktext.style.display = "none"; // 클릭 텍스트 숨기기
    textArea.style.display = "block"; // 텍스트 입력창 보이기
    });
});

