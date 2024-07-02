import { Link } from "react-router-dom";

function MenuAcc()
{
    return (
        <>
            <div className="col-sm-3">
                <div className="left-sidebar">
                <h2>Account</h2>
                    <div className="panel-group category-products" id="accordian">{/*category-productsr*/}
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title">
                                <a data-toggle="collapse" data-parent="#accordian" href="#sportswear">
                                    <Link to="/account/update">
                                        <span className="badge pull-right"><i className="fa fa-plus" /></span>
                                        Account
                                    </Link>
                                </a>
                                </h4>
                            </div>
                        </div>
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <h4 className="panel-title">
                                <a data-toggle="collapse" data-parent="#accordian" href="#mens">
                                    <Link to="/account/user/my-product">
                                        <span className="badge pull-right"><i className="fa fa-plus" /></span>
                                        My Product
                                    </Link>
                                </a>
                                </h4>
                            </div>
                        </div>
                    </div>{/*/category-products*/}
                </div>
            </div>
        </>
    )
}
export default MenuAcc;