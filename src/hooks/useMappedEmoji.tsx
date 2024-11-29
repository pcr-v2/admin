"use client";

import React from "react";

// 주어진 값에서 텍스트와 이미지 태그를 분리하는 함수
export const useMappedEmoji = (value: string) => {
  // <img> 태그를 포함한 부분과 텍스트를 분리하기 위한 정규식
  const result = value.match(/(<img[^>]+>)|([^<]+)/g) || [];

  const mappedContent = result.map((part, index) => {
    if (part.startsWith("<img")) {
      return <span key={index} dangerouslySetInnerHTML={{ __html: part }} />;
    }
    return <span key={index}>{part}</span>;
  });

  return mappedContent;
};
