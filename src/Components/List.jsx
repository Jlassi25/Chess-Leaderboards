import Item from "./Item";
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

const List = ({ players, setPlayers, currentItem, setCurrentItem, list, onRemoveItem }) => {
    //React Pagination Settings
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5; // Number of items to display per page
    const pageCount = Math.ceil(list.length / itemsPerPage); // Total number of pages
    const offset = currentPage * itemsPerPage; // Offset for the current page
    const currentPageItems = list.slice(offset, offset + itemsPerPage); // Items to display for the current page

    return (
        <>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col" className="text-center">Avatar</th>
                        <th scope="col" className="text-center">Username</th>
                        <th scope="col" className="text-center">Score</th>
                        <th scope="col" className="text-center">Rank</th>
                        <th scope="col" className="text-center">Wins</th>
                        <th scope="col" className="text-center">Losses</th>
                        <th scope="col" className="text-center">Draws</th>
                        <th scope="col" className="text-center">Title</th>
                        <th scope="col" className="text-center">Status</th>
                        <th scope="col" className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* maps over the currentPageItems array and generates a series of <Item> */}
                    {currentPageItems.map((item) => (
                        <Item players={players} setPlayers={setPlayers} currentItem={currentItem} setCurrentItem={setCurrentItem} key={item.player_id} item={item} onRemoveItem={onRemoveItem} />
                    ))}
                </tbody>
            </table>


            {/* Pagination */}
            <ReactPaginate
                previousLabel="Previous"
                nextLabel="Next"
                pageCount={pageCount}
                onPageChange={({ selected }) => setCurrentPage(selected)}
                containerClassName="pagination"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                activeClassName="active"
            />

            {/* Modal Confirm player Deletion */}
            <div
                className="modal fade"
                id="al-warning-alert"
                tabIndex="-1"
                aria-labelledby="vertical-center-modal"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-sm">
                    <div
                        className="modal-content modal-filled bg-light-danger"
                    >
                        <div className="modal-body p-4">
                            <div className="text-center text-warning">
                                <i className="ti ti-hexagon-letter-x fs-7"></i>
                                <h4 className="mt-2">Delete Player</h4>
                                <p className="mt-3">
                                    Are you certain about deleting the player with username : {currentItem.username}
                                </p>
                                <button
                                    type="button"
                                    className="btn btn-light my-2"
                                    data-bs-dismiss="modal"
                                    onClick={() => onRemoveItem(currentItem)}
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}





export default List;