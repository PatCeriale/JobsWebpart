import * as React from "react";
import styles from "./KcJobListings.module.scss";
import { IKcJobListingsProps } from "./IKcJobListingsProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { IKcJobListingsState } from "./IKcJobListingsState";
import { IListItem } from "./IListItem";
import { MSGraphClient } from "@microsoft/sp-http";
import {
  // autobind,
  PrimaryButton,
  TextField,
  Label,
  DetailsList,
  DetailsListLayoutMode,
  CheckboxVisibility,
  SelectionMode,
} from "office-ui-fabric-react";
import { getItemClassNames } from "office-ui-fabric-react/lib/components/ContextualMenu/ContextualMenu.classNames";

let _listItemColumns = [
  {
    key: "Title",
    name: "Title",
    fieldName: "Title",
    minWidth: 50,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: "Department",
    name: "Department",
    fieldName: "Department",
    minWidth: 50,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: "ClosingDate",
    name: "ClosingDate",
    fieldName: "ClosingDate",
    minWidth: 50,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: "Location",
    name: "Location",
    fieldName: "Location",
    minWidth: 50,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: "MinimumSalary",
    name: "MinimumSalary",
    fieldName: "MinimumSalary",
    minWidth: 50,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: "MaximumSalary",
    name: "MaximumSalary",
    fieldName: "MaximumSalary",
    minWidth: 50,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: "SalaryInterval",
    name: "SalaryInterval",
    fieldName: "SalaryInterval",
    minWidth: 50,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: "JobType",
    name: "JobType",
    fieldName: "JobType",
    minWidth: 50,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: "URL",
    name: "URL",
    fieldName: "URL",
    minWidth: 50,
    maxWidth: 200,
    isResizable: true,
  },
  {
    key: "JobListingID",
    name: "JobListingID",
    fieldName: "JobListingID",
    minWidth: 50,
    maxWidth: 200,
    isResizable: true,
  },
];

export default class KcJobListings extends React.Component<
  IKcJobListingsProps,
  IKcJobListingsState
  //  added ', IKcJobListingsState' and removed
  //  {}
> {
  constructor(props: IKcJobListingsProps, state: IKcJobListingsState) {
    super(props);

    // Initialize the state of the component
    this.state = {
      lists: [
        {
          Title: "",
          Department: "",
          Location: "",
          ClosingDate: "",
          MinimumSalary: "",
          MaximumSalary: "",
          SalaryInterval: "",
          JobType: "",
          URL: "",
          JobListingID: "",
        },
      ],
    };
  }
  public componentDidMount() {
    // Log the current operation
    console.log("Using _searchWithGraph() method. Component DID mount!");

    this.props.context.msGraphClientFactory
      .getClient()
      .then((client: MSGraphClient): void => {
        client
          .api(
            "sites/patceriale.sharepoint.com:/sites/intranet:/lists('Government Jobs List')/items?expand=fields"
          )
          .version("v1.0")
          .get((err, res) => {
            if (err) {
              console.error("API call error=" + err);
              return;
            }
console.log("API value = " + res.value)
            // Prepare the output array
            var lists: Array<IListItem> = new Array<IListItem>();

            // Map the JSON response to the output array
            res.value.map((item: any) => {
              lists.push({
                Title: item.fields.Title,
                Department: item.fields.Department,
                Location: item.fields.Location,
                ClosingDate: item.fields.ClosingDate,
                MinimumSalary: item.fields.MinimumSalary,
                MaximumSalary: item.fields.MaximumSalary,
                SalaryInterval: item.fields.SalaryInterval,
                JobType: item.fields.JobType,
                URL: item.fields.URL,
                JobListingID: item.fields.JobListingID,
              });
              console.log("lists =" + JSON.stringify(lists));
            });

            // Update the component state accordingly to the result
            this.setState({
              lists: lists,
            });
          });
      });
  }

  public render(): React.ReactElement<IKcJobListingsProps> {
    return (
      <div>
        <div>
          <div>
            <div>
              {/* <span className={styles.title}>King County Jobs</span> */}
              {this.state.lists != null && this.state.lists.length > 0 ? (
                <div>
                  <h1>King County Jobs</h1>
                  <p>
                  {/* <DetailsList
                  items={ this.state.lists }
                  columns={ _listItemColumns }
                  setKey='set'
                  checkboxVisibility={ CheckboxVisibility.hidden }
                  selectionMode={ SelectionMode.none }
                  layoutMode={ DetailsListLayoutMode.fixedColumns }
                  compact={ true }
              /> */}
                    {this.state.lists[0].Department} | Closing{" "}
                    {this.state.lists[0].ClosingDate}
                  </p>
                  <h3>{this.state.lists[0].Title}</h3>
                  <h4>
                    {this.state.lists[0].Location} |{" "}
                    {this.state.lists[0].JobType} | $
                    {this.state.lists[0].MinimumSalary}-$
                    {this.state.lists[0].MaximumSalary} per{" "}
                    {this.state.lists[0].SalaryInterval}
                  </h4>
                  <hr />
                  
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
