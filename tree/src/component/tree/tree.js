import * as React from 'react';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem from '@mui/lab/TreeItem';
import "../../ui/tree/tree.css"

import { nodesData } from "../../json/treedata"

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import _ from 'lodash';

class Tree extends React.Component {  

  constructor() {
    super();
    this.state = {
      keyword: ""
    };
  }
  
   getTreeItemsFromData = treeItems => {
    return treeItems.map(treeItemData => {
      let children = undefined;
      if (treeItemData.children && treeItemData.children.length > 0) {
        children = this.getTreeItemsFromData(treeItemData.children);
      }
      return (
        <TreeItem
          key={treeItemData.id}
          nodeId={treeItemData.id}
          label={treeItemData.name}
          children={children}
        />
      );
    });
  };
  
  DataTreeView = (treeItems) => {
    return (
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{height: 110, flexGrow: 1, maxWidth: 400}}
      >
        {this.getTreeItemsFromData(treeItems)}
      </TreeView>
    );
  };

  keywordFilter = (searchedNodes, keyword ) => {
    let newNodes = [];
    for (let n of searchedNodes) {
      if (n.children) {
        const nextNodes = this.keywordFilter(n.children, keyword);
        if (nextNodes.length > 0) {
          n.children = nextNodes;
        } else if (n.name.toLowerCase().includes(keyword.toLowerCase())) {
          n.children = nextNodes.length > 0 ? nextNodes : [];
        }

        if (
          nextNodes.length > 0 ||
          n.name.toLowerCase().includes(keyword.toLowerCase())
        ) {
          newNodes.push(n);
        }
      } else {
        if (n.name.toLowerCase().includes(keyword.toLowerCase())) {
          newNodes.push(n);
        }
      }
    }
    return newNodes;   
  };

  onSearchInputChange = (searchedNodes, data) => {
    this.setState(prevState => {
      return {
        keyword: data
      };
    });
  };

  render() {
    let searchedNodes = this.state.keyword.trim()
    ? this.keywordFilter(_.cloneDeep(nodesData), this.state.keyword)
    : nodesData;
  return (
    <div className="content">
      <TextField id="standard-basic" label="Filter ..." 
      InputProps={{endAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,}} 
      onChange={(event, data) => {
        this.onSearchInputChange(searchedNodes, event.target.value);
      }}
      />{this.DataTreeView(searchedNodes)}
    </div>
  );
    }
}

export default Tree;