export interface Plugin {
  id: string;
  title: string;
  description: string;
  status: "active" | "disabled" | "inactive";
  tab: string;
}
