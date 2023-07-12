import type { FC, ReactNode } from "react";
import React from "react";
import type { $HEADINGProps } from "../HEADING/HEADING";
import type { FFC } from "../ fxtsx.type";
import { Fxtsx } from "../FxTsx/FxTsx";

export interface $SECTIONProps {
  /**
   * 헤딩의 내용.
   */
  title: string;
  /**
   * 헤딩의 레벨
   */
  level: 1 | 2 | 3 | 4 | 5 | 6;
  /**
   * 헤딩의 보조 내용, 이 속성이 전달되면 heading 은 hgroup 을 사용하여 표현된다.
   */
  subTitle?: ReactNode;
  /**
   * 현재 레벨의 내용
   */
  contents?: ReactNode;
  /**
   * 하위 레벨의 내용
   */
  children?: ReactNode;
}
export type SECTIONProps = $SECTIONProps & {
  /**
   * 섹션을 구현하는 컨포넌트
   */
  $Section: FFC<
    HTMLElement,
    {
      children?: ReactNode;
    }
  >;
  $Heading: FC<$HEADINGProps>;
};

/**
 * 섹션(section) 태그와 대응하는 컴포넌트 구현을 위한 인터페이스
 * */

export const SECTION = Fxtsx<HTMLElement, SECTIONProps>(
  (rootProps, restProps, ref) => {
    const {
      $Section,
      $Heading,
      title,
      level,
      subTitle,
      children,
      contents,
      ...sectionProps
    } = restProps;
    return (
      <$Section data-fx-section {...rootProps} {...sectionProps} ref={ref}>
        <$Heading title={title} level={level} children={subTitle} />
        <div data-fx-section-contents>{contents}</div>
        {children}
      </$Section>
    );
  }
);

/* let i = 0;
  <Article
      content={<><Heading title={"title"} level={i + 1} /></>}
    <Section
      heading={
        <Heading title={"title"} level={i + 1}>
          <p>sub title</p>
        </Heading>
      }
      content={<></>}
    >
      <Heading />
      <Section
        content={
          <>
            <p></p>
          </>
        }
      ></Section>
    </Section>
  </Article>;*/