export type PerformType = {
    by_day: DayType[];
    by_district: DistrictType[];
    by_period: PeriodType[];
};

type DayType = {
    day: string;
    total: string;
};
type DistrictType = {
    district: string;
    total: string;
};
type PeriodType = {
    period: string;
    total: string;
};