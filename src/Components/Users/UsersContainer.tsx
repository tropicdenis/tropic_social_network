import React from 'react';
import {connect} from "react-redux";
import {
    follow,
    requestUsers,
    setCurrentPage,
    toggleIsFollowingProgress,
    unfollow,
    UserType
} from "../../Redux/UsersReducer";
import {AppStateType} from "../../Redux/redux_store";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "../../Redux/users_selectors";


type MapStateToPropsType = {
    users: Array<UserType>
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
    folowingInProgress: Array<number>
}

export type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType

class UsersContainer extends React.Component<UsersPropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber);

        this.props.getUsers(pageNumber, this.props.pageSize);

    }

    render() {

        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalItemsCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}
                   folowingInProgress={this.props.folowingInProgress}
                   portionSize={10}
            />
        </>
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
        return {
            users: getUsers(state),
            pageSize: getPageSize(state),
            totalUsersCount: getTotalUsersCount(state),
            currentPage: getCurrentPage(state),
            isFetching: getIsFetching(state),
            folowingInProgress: getFollowingInProgress(state)


        }
    }
;


type MapDispatchToPropsType =
    {
        follow: (userId: number) => void
        unfollow: (userId: number) => void
        setCurrentPage: (pageNumber: number) => void
        toggleIsFollowingProgress: (isFetching: boolean, userId: number) => void
        getUsers: (currentPage: number, pageSize: number) => void
    }

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, {
        follow, unfollow, setCurrentPage, toggleIsFollowingProgress, getUsers: requestUsers
    })
)(UsersContainer)