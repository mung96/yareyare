export type TeamListResponse = {
  teams: {
    teamId: number;
    teamName: string;
    teamLogo: string;
  }[];
};

export type StadiumResponse = {
  sections: {
    sectionName: string;
    rows: {rowName: string; columns: number[]}[];
  }[];
};
