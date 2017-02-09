import $ from 'jquery'

var appContainerEl = document.querySelector("#app-container")



function buildFullProfileTemplate(legislatorApiData, committeeApiData){
		var congressPersonObj = legislatorApiData.results[0]

		var committeeList =  committeeApiData.results
		var createCommitteeHtmlComponents = committeeList.map(function(committeeObj){
			return `
				<div class='committee'>
				  <h4>${committeeObj.name}</h4>
				  <p>Chamber: ${committeeObj.chamber}</h4>
				</div>
			`
		}).join('')
		
  		return `
		<div class="row">
			<div class="col-xs-3">
				<h2>${congressPersonObj.title} ${congressPersonObj.first_name} ${congressPersonObj.last_name}</h2>
				<p><strong>Chamber : </strong>${congressPersonObj.chamber}</p>
				<p><strong>State : </strong>${congressPersonObj.state_name}</p>
				<p><strong>Party : </strong>${congressPersonObj.party}</p>
			</div>
			<div class="col-xs-9">
				<h3>Committees</h3>
				${createCommitteeHtmlComponents}
			</div>
		</div>
	`
}

//C001109
//S001184
var congressPersonId = 'S001184'

var fetchLegislatorPromise = $.getJSON(`https://congress.api.sunlightfoundation.com/legislators?bioguide_id=${congressPersonId}`)
var fetchCommitteePromise = $.getJSON(`https://congress.api.sunlightfoundation.com/committees?member_ids=${congressPersonId}`)

$.when(fetchLegislatorPromise, fetchCommitteePromise).then(function(legislatorData, committeeData){
	console.log('legislatorData', legislatorData[0])
	console.log('committeeData', committeeData[0])
		appContainerEl.innerHTML = buildFullProfileTemplate(legislatorData[0], committeeData[0] )

})

 // var committeeDataHtml = committeeData.map(function(committee){
 // 	return `
 // 		<div class='committee'>
 // 			<h4>${committee.name}</h4>
 // 			<p>Chamber: ${committee.chamber}</h4>
 // 			<p>Office: ${committee.Office}</p>
 // 		</div>
 // 	`
 //	 	}).join('')