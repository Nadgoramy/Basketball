import React, {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import ReactSelect, { components, GroupBase, MultiValueProps, StylesConfig } from "react-select";
import { useAppDispatch, useAppSelector } from "core/redux/store";
import { playersActions } from "modules/players/hooks/playersPageSlice";
import { OptionTypeValueNumber } from "common/components/StyledSelect";
import { getTeamIds, getTeamList } from "modules/players/selectors";
import styled from "styled-components";
import { themeColors } from "ThemeColors";

const ThemedReactSelect = styled(ReactSelect)`
.Select__control--is-focused {
  border: 0.5px solid ${themeColors.lightest_grey};
  box-shadow: none;
}
`;


export const PlayerTeamFilter: React.FunctionComponent = () => {
  const teamList = useAppSelector(getTeamList);
  const teamIds = useAppSelector(getTeamIds);
  const dispatch = useAppDispatch();
  const selectRef = useRef(null);
  const [maxToShow, setMaxToShow] = useState(5);

  const teamOptions = React.useMemo(() => {
    let options = new Array<OptionTypeValueNumber>();
    teamList.map(t => options.push({ label: t.name, value: t.id, isLast: (teamList.indexOf(t) === teamList.length - 1) }));
    return options;
  }, [teamList]);

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

  const resetMaxToShow = useCallback(() => {
    if (!selectRef.current) return;
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

    const multiValuesNodes = multiValueContainerRef.childNodes;
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
      const selectedItems = (selectRef.current as any).getValue();
      if (selectedItems.length <= count) {
        setMaxToShow(count + 1);
        return;
      }

      const approximateNexItemLength =
        selectedItems[count].label.length * 8 + 44;

      if (
        (selectedItems.length > count + 1 &&
          multiValueContainerRef.clientWidth -
          childrenWidth -
          approximateNexItemLength >
          dotsWidth) ||
        (selectedItems.length === count + 1 &&
          multiValueContainerRef.clientWidth -
          childrenWidth -
          approximateNexItemLength >
          10)
      ) {
        setMaxToShow(count + 1);
      } else setMaxToShow(count);
    }

  }, []);

  useEffect(() => {
    resetMaxToShow();
  }, [resetMaxToShow, teamIds]);

  useLayoutEffect(() => {
    window.addEventListener("resize", resetMaxToShow);
    return () => window.addEventListener("resize", resetMaxToShow);
  }, []);
  const dotsStyle = {
    backgroundColor: themeColors.red,
    color: themeColors.white,
    borderRadius: "4px",
    padding: "0 4px 0 4px",
    height: "24px",
  }
  const MoreSelectedBadge = () => {
    return <div className="Select__multi-value dots" style={dotsStyle}> ... </div>;
  };

  const MultiValue = <
    Option,
    IsMulti extends boolean,
    Group extends GroupBase<Option>
  >(
    props: MultiValueProps<Option, IsMulti, Group>
  ) => {
    const { index } = props;

    return (index < maxToShow ? (
      <components.MultiValue {...props} cropWithEllipsis />
    ) : index === maxToShow ? (
      <MoreSelectedBadge />
    ) : <></>);
  };


  const customStyles: StylesConfig<unknown, boolean> = {
    control: (provided, state) => {
      return {
        ...provided,
        outline: "none",
        boxShadow: "none",
        border: "0.5px solid " + themeColors.lightest_grey,
        "&:optopnal": {
          border: "0.5px solid " + themeColors.lightest_grey,
          boxShadow: "none",
        },
        "&:focus": {
          border: "0.5px solid " + themeColors.lightest_grey,
          boxShadow: "none",
        },
        "&:hover": {
          border: "0.5px solid " + themeColors.lightest_grey,
          boxShadow: "none",
        },
        "&:active": {
          border: "0.5px solid " + themeColors.lightest_grey,
          boxShadow: "none",
        }
      };
    },
    multiValue: (provided, state) => {
      return {
        ...provided,
        backgroundColor: themeColors.red,
        color: themeColors.white,
        borderRadius: "4px",
        padding: "0 4px 0 4px",
        height: "24px",
      };
    },
    multiValueLabel: (provided, state) => {
      return {
        ...provided,
        color: themeColors.white,
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "19px",
      };
    },
    menuList: (provided, state) => {
      return {
        ...provided,
        "&:focused": {
          backgroundColor: themeColors.lightest_red,
          color: themeColors.white,
        }
      };
    },
    placeholder: (provided, state) => {
      return {
        ...provided,
        fontWeight: "500",
        fontSize: "15px",
        lineHeight: "24px",
      };
    },
    option: (provided, state) => {
      return {
        ...provided,
        backgroundColor: state.isSelected ? themeColors.light_red : themeColors.white,
        color: state.isSelected ? themeColors.white : themeColors.light_grey,
        borderBottom: teamOptions[teamOptions.length - 1].value !== (state.data as OptionTypeValueNumber).value ? "0.5px solid " + themeColors.lightest_grey : "none",
        overflowWrap: "anywhere",
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "24px",
        "&:hover": {
          backgroundColor: themeColors.dark_red,
          color: themeColors.white,
        },
        "&:focused": {
          backgroundColor: themeColors.lightest_red,
          color: themeColors.white,
        }
      };
    },
  }

  return (
    <ThemedReactSelect
      classNamePrefix="Select"
      ref={selectRef}
      styles={customStyles}
      options={teamOptions}
      isSearchable={false}
      isMulti
      value={teamOptions?.filter((obj: OptionTypeValueNumber) =>
        teamIds.includes(obj.value)
      )}
      onChange={(e: any) => updateTeamFilter(e as OptionTypeValueNumber[])}
      components={{
        MultiValue: MultiValue,
      }}
    />
  );
};