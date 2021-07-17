import React, { useEffect } from 'react'


export const Modal = ({ title, children, footer, show }) => {
	useEffect(() => {
		console.log("show model effect")
		$("#myModal").modal(show? "show": "hide")
	}, [show])

	return (
		<div className="modal" tabIndex="-1" role="dialog" id="myModal">
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">{title}</h5>
						<button type="button" className="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>
					<div className="modal-body">
						{children}
					</div>
					{footer && (
						<div className="modal-footer">
							{footer()}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}