import { EmojiData, TEmoji } from "@/config/emojiData";

// 자동 하이픈 삽입
export function autoHyphen(phoneNumber: string): string {
  const number = phoneNumber.trim().replace(/[^0-9]/g, "");
  if (number.length < 4) return number;
  if (number.length < 7) return number.replace(/(\d{3})(\d{1})/, "$1-$2");
  if (number.length < 11)
    return number.replace(/(\d{3})(\d{3})(\d{1})/, "$1-$2-$3");
  return number.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
}

// 이메일 포맷
export const isEmailFormat = (email: string) => {
  if (email == null || email.length <= 0) return false;

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return emailRegex.test(email);
};

// 비번 포맷 영소,영대,특문,숫자 6-12자리
export const isPasswordFormat = (password: string) => {
  if (password == null || password.length <= 0) return false;

  const passwordRegex = /^(?=.*[a-z])(?=.*\d)[a-zA-Z\d\W]{6,12}$/;

  return passwordRegex.test(password);
};

// 폰번 포맷
export const isPhoneNumberFormat = (phoneNumber: string) => {
  const removedHyphen = phoneNumber?.replaceAll("-", "");
  if (phoneNumber == null || phoneNumber.length <= 0) return false;
  const phoneNumberRegex = /^01([0|1|6|7|8|9])-?([0-9]{4})-?([0-9]{4})$/;
  return phoneNumberRegex.test(removedHyphen);
};

// 하이픈 제거
export const getOnlyNumber = (number: string) => {
  const result = number.replace(/[^.0-9]/g, "");
  return result;
};

// 이름 포맷 한,영,숫자 1-20자리
export const isNameFormat = (name: string) => {
  const nameRegex = /^[가-힣ㄱ-ㅎㅏ-ㅣ\x20A-Za-z0-9\s]{1,20}$/;
  return nameRegex.test(name);
};

export const mappingEmoji = (value: string) => {
  // EmojiData 배열을 객체로 변환

  const emojiMap: TEmoji = EmojiData.reduce((acc, curr) => {
    const key = Object.keys(curr)[0]; // 객체의 키를 가져옵니다.
    const val = curr[key];
    acc[key] = val; // 키-값 쌍으로 추가
    return acc;
  }, {} as TEmoji);

  // 텍스트를 ::something:: 기준으로 나누기
  const splitText = value.split(/(::.+?::)/g).filter(Boolean);

  // 이모지 치환
  const mappedText = splitText.map((part) => {
    // 이모지 키가 있다면 <img> 태그로 치환, 없으면 그대로 반환
    if (emojiMap[part]) {
      return `<img src="${emojiMap[part]}" alt="${part}" style="width:32px; height:32px;"/>`;
    }
    return part;
  });

  return mappedText.join(""); // 치환된 텍스트를 하나로 합쳐서 반환
};

export const focusContentEditableTextToEnd = (element: HTMLElement) => {
  if (element.innerText.length === 0) {
    element.focus();
    return;
  }

  const selection = window.getSelection();

  const newRange = document.createRange();
  newRange.selectNodeContents(element);
  newRange.collapse(false);
  selection?.removeAllRanges();
  selection?.addRange(newRange);
};

{
  /* <ChatInput
            label="메세지를 입력해주세요"
            value={currentMessage}
            name="message"
            onChange={(e) => setCurrentMessage(e.target.value)}
            children={
              <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <motion.img
                  initial="beforeHover"
                  whileHover="onHover"
                  variants={{
                    beforeHover: { scale: 1 },
                    onHover: { scale: 1.2 },
                  }}
                  src={Emoji_Add.src}
                  alt="add"
                  style={{ width: "32px", height: "32px", cursor: "pointer" }}
                  onClick={() => setOnClickEmoji(!onClickEmoji)}
                />
                <EndAdormentButton
                  variant="contained"
                  onClick={sendMessage}
                  type="submit"
                >
                  전송
                </EndAdormentButton>
              </Box>
            }
            disabled={false}
          /> */
}

{
  /* <ImageInput
            msg={currentMessage}
            children={
              <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <motion.img
                  initial="beforeHover"
                  whileHover="onHover"
                  variants={{
                    beforeHover: { scale: 1 },
                    onHover: { scale: 1.2 },
                  }}
                  src={Emoji_Add.src}
                  alt="add"
                  style={{ width: "32px", height: "32px", cursor: "pointer" }}
                  onClick={() => setOnClickEmoji((prev) => !prev)}
                />
                <EndAdormentButton
                  variant="contained"
                  onClick={sendMessage}
                  type="submit"
                >
                  전송
                </EndAdormentButton>
              </Box>
            }
            onChange={(value) => {
              console.log("시발", value);
              setCurrentMessage((prev) => prev + value);
            }}
          /> */
}
