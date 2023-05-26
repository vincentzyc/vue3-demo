interface Window {
  scroll2Bottom(): void;
}

declare module '@vant/area-data' {
  export declare const areaList: {
    province_list: Record<string, string>;
    city_list: Record<string, string>;
    county_list: Record<string, string>;
  };
  type CascaderOption = {
    text: string;
    value: string;
    children?: CascaderOption[];
  };
  export declare function useCascaderAreaData(): CascaderOption[];
  export {};
}
