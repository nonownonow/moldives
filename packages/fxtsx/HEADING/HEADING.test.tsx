import { HEADING } from "./HEADING";
import type { RenderResult } from "@testing-library/react";
import { render } from "@testing-library/react";
import React, { forwardRef } from "react";

describe("HEADING", () => {
  const HeadingComp = jest.fn((props, ref) => (
    //   중복 속성 체크를 위해서 props를 컴포넌트에 전달한다 예: data-heading속성을 단 하나의 하위컴포넌트에서 받는 지 테스트할 때
    <h1 data-testid={"Heading"} {...props} />
  ));
  const HgroupComp = jest.fn((props) => (
    <hgroup data-testid={"Hgroup"} {...props} />
  ));
  let wrapper: RenderResult;
  describe("기본 렌더링", () => {
    beforeEach(() => {
      wrapper = render(
        <HEADING
          data={"Hello Heading!"}
          level={1}
          Heading={forwardRef(HeadingComp)}
          Hgroup={HgroupComp}
          ref={(el) => {}}
        />
      );
    });

    test("data, level, ref 는 Heading 의 속성으로 전달된다.", () => {
      expect(HeadingComp.mock.calls[0][0]).toHaveProperty("data");
      expect(HeadingComp.mock.calls[0][0]).toHaveProperty("level");
      expect(HeadingComp.mock.calls[0][1]).toHaveProperty("name", "ref");
    });
    test("data-heading 속성은 root component 한곳에만 전달된다.", () => {
      const { container } = wrapper;
      expect(container.querySelectorAll("[data-heading]").length).toEqual(1);
      const Heading = container.firstChild;
      if (Heading instanceof HTMLElement) {
        expect(Heading.dataset.heading).toEqual("true");
      }
    });
    test("children 이 없으면 Heading 이 root 에 랜더링된다.", () => {
      const root = wrapper.container.firstChild as HTMLElement;
      expect(root.dataset.testid).toEqual("Heading");
    });
  });
  describe("children 이 있으면", () => {
    beforeEach(() => {
      wrapper = render(
        <HEADING
          data={"Hello Heading!"}
          level={1}
          Heading={forwardRef(HeadingComp)}
          Hgroup={HgroupComp}
          ref={(el) => {}}
        >
          <p data-testid={"children"}>부제목</p>
        </HEADING>
      );
    });
    test("Hgroup 이 root 에 랜더링된다.", () => {
      const root = wrapper.container.firstChild as HTMLElement;
      expect(root.dataset.testid).toEqual("Hgroup");
    });
    test("Heading 은 Hgroup 의 첫번째 children 으로, children 은 Hgroup 의 두번째 children 으로 랜더링된다.", () => {
      const Hgroup = wrapper.container.querySelector("[data-testid=Hgroup]");
      const firstChild = Hgroup?.firstChild as HTMLElement;
      const secondChild = firstChild.nextElementSibling as HTMLElement;
      expect(firstChild.dataset.testid).toEqual("Heading");
      expect(secondChild.dataset.testid).toEqual("children");
    });
  });
});