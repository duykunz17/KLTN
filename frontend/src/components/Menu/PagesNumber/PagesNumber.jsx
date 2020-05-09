import React, { Component } from 'react';

import './PagesNumber.css';

// const PageButton = ({currentPage, page}) => {
//     console.log(page);
//     return (
//         page.number === currentPage ? (
//             <span className="currentPage" > {page.number} </span>
//         ) : (
//             <button className="pages"> {page.number} </button>
//         )
//     );
// };

export default class PagesNumber extends Component {

    showPagesNumber = (pages, currentPage) => {
        let result = null;
        if (pages.length > 0) {
            result = pages.map((page, index) => {
                return (
                    page.number === currentPage ? (
                        <span className="currentPage" key={index} > {page.number} </span>
                    ) : (
                        <button key={index} className="pages" onClick={() => this.onClick(page.number)}> {page.number} </button>
                    )
                    // <PageButton key={index} currentPage={currentPage} page={page} />
                );
            });
        }
        return result;
    };

    onClick = (number) => {
        this.props.onChangePage(number);
    }

    render() {
        var { pages, currentPage } = this.props;
        return (
            <div className="paginator">
                { this.showPagesNumber(pages, currentPage) }
            </div>
        )
    }
}