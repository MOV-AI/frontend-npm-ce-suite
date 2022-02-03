import React, { useCallback } from "react";
import PropTypes from "prop-types";
import _get from "lodash/get";
import _set from "lodash/set";
import { Maybe } from "monet";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { withViewPlugin } from "../../../engine/ReactPlugin/ViewReactPlugin";
import { useTranslation } from "../editors/_shared/mocks";
import VirtualizedTree from "./components/VirtualizedTree/VirtualizedTree";
import movaiFullLogo from "../editors/_shared/Branding/movai-full-logo.png";

const useStyles = makeStyles(theme => ({
  typography: {
    overflowY: "auto",
    overflowX: "hidden",
    justifyContent: "center",
    width: "100%"
  },
  header: {
    marginBottom: 6,
    "& img": {
      maxWidth: "65%"
    }
  }
}));

const Explorer = props => {
  const { call, on, height } = props;
  const classes = useStyles();
  const [data, setData] = React.useState([]);

  const { t } = useTranslation();

  //========================================================================================
  /*                                                                                      *
   *                                    Private Methods                                   *
   *                                                                                      */
  //========================================================================================

  /**
   * Push element into list in correct position
   * @param {Array} list
   * @param {TreeNode} element
   */
  const _pushSorted = useCallback((list, element) => {
    /**
     * Compare objects' name property to sort
     * @param {*} a
     * @param {*} b
     * @returns
     */
    const compareByName = (a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    };
    // Insert element
    list.push(element);
    // Return sorted list
    return list.sort(compareByName).map((x, i) => ({ ...x, id: i }));
  }, []);

  /**
   * Delete document from local list
   * @param {{documentName: String, documentType: String}} docData
   */
  const _deleteDocument = useCallback(docData => {
    const { documentName, documentType } = docData;
    setData(prevState => {
      const newData = [...prevState];
      // TODO: optimize time
      const typeIndex = newData.findIndex(type => type.name === documentType);
      if (typeIndex >= 0) {
        const documentIndex = newData[typeIndex].children.findIndex(
          doc => doc.name === documentName
        );
        if (documentIndex >= 0) {
          newData[typeIndex].children.splice(documentIndex, 1);
        }
      }
      return newData;
    });
  }, []);

  /**
   * Insert newly created document
   * @param {DocManager} docManager
   * @param {{documentName: String, documentType: String}} docData
   */
  const _addDocument = useCallback(
    (docManager, docData) => {
      const { documentName, documentType, document } = docData;
      setData(prevState => {
        // TODO: optimize time
        const newData = [...prevState];
        const typeIndex = newData.findIndex(type => type.name === documentType);
        if (typeIndex >= 0) {
          const documentIndex = newData[typeIndex].children.findIndex(
            doc => doc.name === documentName
          );
          if (documentIndex < 0) {
            _pushSorted(newData[typeIndex].children, {
              name: document.getName(),
              title: document.getName(),
              scope: document.getScope(),
              url: document.getUrl()
            });
          }
        }
        return newData;
      });
    },
    [_pushSorted]
  );

  //========================================================================================
  /*                                                                                      *
   *                                     Handle Events                                    *
   *                                                                                      */
  //========================================================================================

  /**
   * Expand tree or open document depending on the node deepness
   *  0 : collapse others and expand tree node
   *  1 : open document node
   * @param {{id: String, deepness: String, url: String, name: String, scope: String}} node : Clicked node
   */
  const requestScopeVersions = useCallback(
    node => {
      const deepnessToAction = {
        0: () => {
          // Toggle the expansion of the clicked panel
          setData(prevData => {
            const nextData = [...prevData];
            const isExpanded = _get(
              prevData,
              [node.id, "state", "expanded"],
              false
            );
            _set(nextData, [node.id, "state"], {
              expanded: !isExpanded
            });

            // Close other panels
            prevData
              .filter(elem => elem.id !== node.id)
              .forEach(panel => {
                _set(nextData, [panel.id, "state"], {
                  expanded: false
                });
              });
            return nextData;
          });
        },
        1: () => {
          call("tabs", "openEditor", {
            id: node.url,
            name: node.name,
            scope: node.scope
          });
        }
      };
      _get(deepnessToAction, node.deepness, () => {
        console.log("action not implemented");
      })();
    },
    [call]
  );

  /**
   * Handle click to copy document
   * @param {{name: string, scope: string}} node : Clicked document node
   */
  const handleCopy = useCallback(
    node => {
      const { name, scope } = node;
      call("dialog", "copyDocument", {
        scope,
        name,
        onSubmit: newName =>
          new Promise((resolve, reject) => {
            call("docManager", "copy", { name, scope }, newName).then(
              copiedDoc => {
                resolve();
                // Open copied document
                requestScopeVersions({
                  scope,
                  deepness: 1,
                  name: copiedDoc.getName(),
                  url: copiedDoc.getUrl()
                });
              }
            );
          })
      });
    },
    [call, requestScopeVersions]
  );

  /**
   * Handle click to delete document
   * @param {{name: string, scope: string}} node : Clicked document node
   */
  const handleDelete = useCallback(
    node => {
      const { name, scope } = node;
      call("dialog", "confirmation", {
        submitText: t("Delete"),
        title: t("Confirm to delete"),
        onSubmit: () =>
          call("docManager", "delete", { name, scope }).catch(error =>
            console.log(
              `Could not delete ${name} \n ${error.statusText ?? error}`
            )
          ),
        message: `Are you sure you want to delete the document "${name}"?`
      });
    },
    [call, t]
  );

  //========================================================================================
  /*                                                                                      *
   *                                   React callbacks                                    *
   *                                                                                      */
  //========================================================================================

  /**
   * Load documents
   * @param {DocManager} docManager
   */
  const loadDocs = useCallback(docManager => {
    return setData(_ =>
      docManager.getStores().map((store, id) => {
        const { name, title } = store;
        return {
          id,
          name,
          title,
          children: store.getDocs().map((doc, childId) => {
            return {
              id: childId,
              name: doc.getName(),
              title: doc.getName(),
              scope: doc.getScope(),
              url: doc.getUrl()
            };
          })
        };
      })
    );
  }, []);

  /**
   *
   * @param {DocManager} docManager
   * @param {{action: String, documentName: String, documentType: String}} docData
   */
  const updateDocs = useCallback(
    (docManager, docData) => {
      const { action } = docData;
      const updateByActionMap = {
        del: () => _deleteDocument(docData),
        set: () => _addDocument(docManager, docData)
      };
      Maybe.fromNull(updateByActionMap[action]).forEach(updateAction =>
        updateAction()
      );
    },
    [_deleteDocument, _addDocument]
  );

  //========================================================================================
  /*                                                                                      *
   *                                   React lifecycles                                   *
   *                                                                                      */
  //========================================================================================

  React.useEffect(() => {
    on("docManager", "loadDocs", loadDocs);
    on("docManager", "updateDocs", updateDocs);
  }, [on, loadDocs, updateDocs]);

  //========================================================================================
  /*                                                                                      *
   *                                       Render                                         *
   *                                                                                      */
  //========================================================================================

  return (
    <Typography component="div">
      <h1 className={classes.header}>
        <img src={movaiFullLogo} alt={t("Mov.AI Logo")} />
      </h1>
      <Typography component="div" className={classes.typography}>
        <VirtualizedTree
          data={data}
          onClickNode={requestScopeVersions}
          handleCopyClick={handleCopy}
          handleDeleteClick={handleDelete}
          showIcons={true}
          height={height}
        ></VirtualizedTree>
      </Typography>
    </Typography>
  );
};

export default withViewPlugin(Explorer);

Explorer.propTypes = {
  call: PropTypes.func.isRequired,
  on: PropTypes.func.isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Explorer.defaultProps = {
  height: 700
};
