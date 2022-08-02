import React, { useRef, useState, useEffect, useLayoutEffect } from "react";
import { StyledMultiSelect } from "common/components/StyledMultiSelect";
import { components, MultiValueProps } from "react-select";
import { useAppDispatch, useAppSelector } from "core/redux/store";
import { playersActions } from "modules/players/hooks/playersPageSlice";
import { OptionTypeValueNumber } from "common/components/StyledSelect";
import { getTeamIds, getTeamsOptions } from "modules/players/selectors";

export const PlayerTeamFilter: React.FunctionComponent = () => {
  const teamNames = useAppSelector(getTeamsOptions);
  const teamIds = useAppSelector(getTeamIds);
  const dispatch = useAppDispatch();
  const selectRef = useRef(null);
  const [maxToShow, setMaxToShow] = useState(5);

  const updateTeamFilter = (evn: OptionTypeValueNumber[]) => {
    if (!evn) {
      dispatch(playersActions.setTeamFilter(null));
      setMaxToShow(5);
    } else {
      let teamRequest: number[] = [];
      evn.map((item) => teamRequest.push(item.value));
      dispatch(playersActions.setTeamFilter(teamRequest));
    }
  };

  useEffect(() => {
    resetMaxToShow();
  }, [teamIds]);

  function resetMaxToShow() {
    const multiValueContainerRef = (selectRef.current as any).controlRef
      ?.firstChild;
    if (!multiValueContainerRef) return;
    if (multiValueContainerRef.clientWidth < 100) {
      setMaxToShow(0);
      return;
    }
    if (
      teamIds.length <= 1 &&
      (selectRef.current as any).getValue().length <= 1
    ) {
      setMaxToShow(5);
      return;
    }

    let multiValuesNodes = multiValueContainerRef.childNodes; //.querySelector(".Select__multi-value"); //.filter((child : any) => child.type.name == "")
    let minOffsetTop = multiValuesNodes[0].offsetTop;
    multiValuesNodes.forEach(
      (child: any) =>
        (minOffsetTop =
          child.offsetTop && minOffsetTop > child.offsetTop
            ? child.offsetTop
            : minOffsetTop)
    );

    let count = 0;
    let childrenWidth = 0;
    const dotsWidth = 40;
    multiValuesNodes.forEach((child: any) => {
      if (
        child.className.includes("Select__multi-value") &&
        !child.className.includes("dots")
      ) {
        count += child.offsetTop === minOffsetTop ? 1 : 0;
        childrenWidth +=
          child.offsetTop === minOffsetTop ? child.clientWidth + 4 : 0;
      }
    });

    if (multiValueContainerRef.clientHeight > 40) {
      if (multiValueContainerRef.clientWidth - childrenWidth > dotsWidth) {
        setMaxToShow(count);
      } else {
        setMaxToShow(count - 1);
      }
    } else {
      let selectedItems = (selectRef.current as any).getValue();
      if (selectedItems.length <= count) {
        setMaxToShow(count + 1);
        return;
      }

      let approximateNexItemLength = selectedItems[count].label.length * 8 + 44;

      if (
        (selectedItems.length > count + 1 &&
          multiValueContainerRef.clientWidth -
            childrenWidth -
            approximateNexItemLength >
            dotsWidth) ||
        (selectedItems.length == count + 1 &&
          multiValueContainerRef.clientWidth -
            childrenWidth -
            approximateNexItemLength >
            10)
      ) {
        setMaxToShow(count + 1);
      } else setMaxToShow(count);
    }
    console.log(multiValueContainerRef.clientHeight);
  }
  useLayoutEffect(() => {
    function handleResize() {
      resetMaxToShow();
    }
    window.addEventListener("resize", handleResize);
    return () => window.addEventListener("resize", handleResize);
  }, []);

  const MoreSelectedBadge = () => {
    return <div className="Select__multi-value dots"> ... </div>;
  };
  const MultiValue = (props: MultiValueProps) => {
    const { index, getValue, data } = props;

    const overflow = getValue()
      .slice(maxToShow)
      .map((x: any) => x.label);

    return index < maxToShow ? (
      <components.MultiValue {...props} cropWithEllipsis />
    ) : index === maxToShow ? (
      <MoreSelectedBadge />
    ) : null;
  };

  return (
    <StyledMultiSelect
      ref={selectRef}
      classNamePrefix="Select"
      options={teamNames}
      isMulti
      value={teamNames.filter((obj: OptionTypeValueNumber) =>
        teamIds.includes(obj.value)
      )}
      onChange={(e: any) => updateTeamFilter(e as OptionTypeValueNumber[])}
      isSearchable={false}
      components={{
        MultiValue: MultiValue,
      }}
    />
  );
};
