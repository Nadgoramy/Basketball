import { Component, DetailedHTMLProps, ReactNode, SelectHTMLAttributes } from "react";
import { ActionMeta, GroupBase, InputActionMeta, MultiValue, Options } from "react-select";
import { AriaSelection } from "react-select/dist/declarations/src/accessibility";
import Select, { Props } from "react-select/dist/declarations/src/Select";

interface State<Option, IsMulti extends boolean, Group extends GroupBase<Option>> {
    ariaSelection: AriaSelection<Option, IsMulti> | null;
    inputIsHidden: boolean;
    isFocused: boolean;
    focusedOption: Option | null;
    focusedValue: Option | null;
    selectValue: Options<Option>;
    clearFocusValueOnUpdate: boolean;
    prevWasFocused: boolean;
    inputIsHiddenAfterUpdate: boolean | null | undefined;
    prevProps: Props<Option, IsMulti, Group> | void;
}

class  Multiselect<Option = unknown, IsMulti extends boolean = true, Group extends GroupBase<Option> = GroupBase<Option>> 
    extends Component<Props<Option, IsMulti, Group>, State<Option, IsMulti, Group>> {
    constructor(props: Props<Option, IsMulti, Group> | Readonly<Props<Option, IsMulti, Group>>){        
        super(props)
    }

    static defaultPops={
        isMulti: true,
        styles:{undefined} ,
        tabIndex:0 ,
        tabSelectsValue:false ,
        value:null,
        backspaceRemovesValue:false, 
        blurInputOnSelect: false,
        captureMenuScroll: false, 
        closeMenuOnSelect: false, 
        closeMenuOnScroll: false, 
        components: undefined ,
        controlShouldRenderValue: false,
        escapeClearsValue: false,
        filterOption: null,
        inputValue: "", 
        isDisabled: false,
        isLoading: false,
        isRtl: false, 
        isSearchable: false,        
        minMenuHeight: 0,
        maxMenuHeight:0,
        menuIsOpen: false,
        menuPlacement: "auto",        
        menuPosition: "fixed",
        menuShouldBlockScroll: false,
        menuShouldScrollIntoView: false,
        openMenuOnFocus:false,
        openMenuOnClick: false,
        pageSize: 0,
        placeholder: undefined,

        formatGroupLabel: {function (group: GroupBase<{ value: string; label: string; }>): ReactNode { return null} } ,
        getOptionLabel: {function (option: { value: string; label: string; }): string { return option.label; } } ,
        getOptionValue: {function (option: { value: string; label: string; }): string { return option.value } },
        isOptionDisabled: {function (option: { value: string; label: string; }, selectValue: Options<{ value: string; label: string; }>): boolean {
          throw new Error("Function not implemented.");
        } },   
        
        loadingMessage: {function (obj: { inputValue: string; }): ReactNode {
          throw new Error("Function not implemented.");
        } },
        
        noOptionsMessage: {function (obj: { inputValue: string; }): ReactNode {
          throw new Error("Function not implemented.");
        } },
        onChange: {function (newValue: MultiValue<{ value: string; label: string; }>, actionMeta: ActionMeta<{ value: string; label: string; }>): void {
          throw new Error("Function not implemented.");
        } },
        onInputChange: {function (newValue: string, actionMeta: InputActionMeta): void {
          throw new Error("Function not implemented.");
        } },
        onMenuOpen:{function (): void {  } },
        onMenuClose:{function (): void {  } }, 
        screenReaderStatus:{function (obj: { count: number; }): string {
          throw new Error("Function not implemented.");
        } } 
    }
}

export default Multiselect;