export default function getPriceAndCostCalculation(
	serviceType, 
	level,
	hours, 
	location, 
	venue,
  place,
  participantRatio)
{

  var baseCost = 40000;
  var basePrice = 60000;

  var discountHourPack = getTransformationHourPack(hours);
  var discountStudent = getDiscountHourPackStudent(basePrice , discountHourPack);
  var discountTeacher = getDiscountHourPackTeacher(baseCost ,discountHourPack);

 
  var locationTransformation = getLocationTransformation(location, venue, place);
  // var discountPercentageLocationStudent = getPercentageLocationStudent(discountStudent, locationTransformation); 
   //var discountPercentageLocationTeacher = getPercentageLocationTeacher(discountTeacher, locationTransformation);

  
 var discountLevel = getLevelTransformation(level);
 var levelPercentageStudent = getLevelPercentageStudent(discountStudent,discountLevel);
 var levelPercentageTeacher = getLevelPercentageTeacher(discountTeacher, discountLevel);

// var levelPercentageTeacher = getLevelPercentageTeacher(discountPercentageLocationTeacher, discountLevel);

 var serviceTypeTransformation = getServiceAmountTransformation(serviceType);
  levelPercentageStudent = getIncrementMembership(levelPercentageStudent,serviceTypeTransformation);

  var division = 1.0;
  var divisionStudent = getMultiplicationStudent(division,locationTransformation)
  var divisionTeacher = getMultiplicationTeacher(division,locationTransformation)


  
  levelPercentageStudent = levelPercentageStudent*divisionStudent;
  levelPercentageTeacher = levelPercentageTeacher*divisionTeacher;

 var addedPriceFlatStudent = getAddedPriceFlatStudent(levelPercentageStudent,locationTransformation);
 var addedCostFlatTeacher = getAddedPriceFlatTeacher(levelPercentageTeacher,locationTransformation);

 
  var resultS = addedPriceFlatStudent * hours;
  var resultT = addedCostFlatTeacher * hours;


     
  
  return [ resultT , resultS];
  
}


function getTransformationHourPack(hours)
{
  switch (hours) {
    case "10": return { 'ipp' : 0, 'dpp' : 15, 'ipc' : 0, 'dpc' : 15, 'iap' : 0, 'iac' : 0 };
    case "15": return { 'ipp' : 0, 'dpp' : 20, 'ipc' : 0, 'dpc' : 15, 'iap' : 0, 'iac' : 0 };
    case "20": return { 'ipp' : 0, 'dpp' : 25, 'ipc' : 0, 'dpc' : 15, 'iap' : 0, 'iac' : 0 };
    case "25": return { 'ipp' : 0, 'dpp' : 27.5, 'ipc' : 0, 'dpc' : 15, 'iap' : 0, 'iac' : 0 };
	  case "30": return { 'ipp' : 0, 'dpp' : 30, 'ipc' : 0, 'dpc' : 15, 'iap' : 0, 'iac' : 0 };
    case "40": return { 'ipp' : 0, 'dpp' : 32.5, 'ipc' : 0, 'dpc' : 15, 'iap' : 0, 'iac' : 0 };
    case "50": return { 'ipp' : 0, 'dpp' : 35, 'ipc' : 0, 'dpc' : 15, 'iap' : 0, 'iac' : 0 };
    default: return { 'ipp' : 0, 'dpp' : 0, 'ipc' : 0, 'dpc' : 0, 'iap' : 0, 'iac' : 0 };
  }
 }



function getLevelTransformation(level)
{
  level = level.toLowerCase();
 	switch (level) {
  	case "semi": return { 'ipp' : 0, 'dpp' : 10, 'ipc' : 0, 'dpc' : 10, 'iap' : 0, 'iac' : 0 };
    case "pro": return { 'ipp' : 0, 'dpp' : 0, 'ipc' : 0, 'dpc' : 0, 'iap' : 0, 'iac' : 0 };
    case "master": return { 'ipp' : 20, 'dpp' : 0, 'ipc' : 10, 'dpc' : 0, 'iap' : 0, 'iac' : 0 };
  	default : return { 'ipp' : 0, 'dpp' : 0, 'ipc' : 0, 'dpc' : 0, 'iap' : 0, 'iac' : 0 };
	}
}



function getServiceAmountTransformation(service)
{
  service = service.toLowerCase();
 	switch (service) {
  	case "basic": return { 'ipp' : 0, 'dpp' : 0, 'ipc' : 0, 'dpc' : 0, 'iap' : 0, 'iac' : 0 };
    case "standard": return { 'ipp' : 15, 'dpp' : 0, 'ipc' : 0, 'dpc' : 0, 'iap' : 0, 'iac' : 0 };
    case "premium": return { 'ipp' : 30, 'dpp' : 0, 'ipc' : 0, 'dpc' : 0, 'iap' : 0, 'iac' : 0 };
  	default : return { 'ipp' : 0, 'dpp' : 0, 'ipc' : 0, 'dpc' : 0, 'iap' : 0, 'iac' : 0 };
	}
}



function getLocationTransformation(location, venue, place)
{
  location = location.toLowerCase();
  venue = venue.toLowerCase();
  if(place != null){
    place = place.toLowerCase();  
  }
  else
  {
    place = "";
  }

  var option = location + place;
  if(venue === "online") { option = "virtual" }

	switch (option)
  {
  	case "virtual" :        return { 'ipp' : 0, 'dpp' : 25, 'ipc' : 0, 'dpc' : 30, 'iap' : 0, 'iac' : 0 };
  	case "medellinhome" :   return { 'ipp' : 0, 'dpp' : 0, 'ipc' : 0, 'dpc' : 0, 'iap' : 0, 'iac' : 0 };
  	case "medellinstudio" : return { 'ipp' : 0, 'dpp' : 0, 'ipc' : 0, 'dpc' : 0, 'iap' : 15000, 'iac' : 15000 };
  	case "bogotahome" :     return { 'ipp' : 20, 'dpp' : 0, 'ipc' : 20, 'dpc' : 0, 'iap' : 0, 'iac' : 0 };
    case "bogotastudio" :   return { 'ipp' : 20.0, 'dpp' : 0, 'ipc' : 20, 'dpc' : 0, 'iap' : 20000, 'iac' : 20000 };
  	case "cartagenahome" :  return { 'ipp' : 10, 'dpp' : 0, 'ipc' : 10, 'dpc' : 0, 'iap' : 0, 'iac' : 0 };
	  case "cartagenastudio" :return { 'ipp' : 10, 'dpp' : 0, 'ipc' : 10, 'dpc' : 0, 'iap' : 30000, 'iac' : 30000 };
  	case "calihome" :       return { 'ipp' : 0, 'dpp' : 10, 'ipc' : 0, 'dpc' : 10, 'iap' : 0, 'iac' : 0 };
	  case "calistudio" :     return { 'ipp' : 0, 'dpp' : 10, 'ipc' : 0, 'dpc' : 10, 'iap' : 10000, 'iac' : 10000 };
    default: return { 'ipp' : 0, 'dpp' : 0, 'ipc' : 0, 'dpc' : 0, 'iap' : 0, 'iac' : 0 };
  }
  
}

//-------------------------------------------------------------------------------------------------
function getDiscountHourPackStudent(base, transformationObject)
{
 if(transformationObject.dpp > 0)
 {
   base -= calculatePercentageAmount(base,transformationObject.dpp);
   
 } 
    return base;
}



function getDiscountHourPackTeacher(base , transformationObject)
{
  if(transformationObject.dpc > 0)
  {
    base -= calculatePercentageAmount(base, transformationObject.dpc);
  }
  return base;
}



// function getPercentageLocationStudent(discount, transformationObject)
// {
//   if(transformationObject.ipp > 0 )
//   {
//     discount += calculatePercentageAmount(discount, transformationObject.ipp)
//   }

//   if(transformationObject.dpp > 0)
//   {
//       discount -= calculatePercentageAmount(discount, transformationObject.dpp)
//   }
//   return discount;
// }



// function getPercentageLocationTeacher(discount, transformationObject)
// {
//   if(transformationObject.dpp > 0)
//   {
//     discount -= calculatePercentageAmount(discount ,transformationObject.dpp);
//   }
//   if(transformationObject.ipc > 0)
//   {
//     discount += calculatePercentageAmount(discount,transformationObject.ipc)
//   }
//   return discount;
// }



function getIncrementMembership(discount, transformationObject)
{
  if(transformationObject.dpc)
  {
    discount -= calculatePercentageAmount(discount, transformationObject.dpc);
  }
  if(transformationObject.ipp > 0 )
  {
    discount += calculatePercentageAmount(discount,transformationObject.ipp)
  }
  return discount;
}



function getLevelPercentageStudent(discount, transformationObject)
{
 if(transformationObject.ipp > 0)
 {
  discount += calculatePercentageAmount(discount,transformationObject.ipp);
 }
 if(transformationObject.dpp > 0 )
 {
     discount -= calculatePercentageAmount(discount, transformationObject.dpp)
 }
 return discount;
}



function getLevelPercentageTeacher(discount,transformationObject)
{
  if(transformationObject.ipc > 0)
  {
    discount += calculatePercentageAmount(discount,transformationObject.ipc)
  }
  if(transformationObject.dpc > 0)
  {
    discount -= calculatePercentageAmount(discount,transformationObject.dpc)
  }
  return discount;
}



function getAddedPriceFlatStudent(multiplication,transformationObject)
{
if(transformationObject.iap > 0 )
{
  multiplication += transformationObject.iap
}
return multiplication;

}



function getAddedPriceFlatTeacher(levelPercentageTeacher,transformationObject)
{
  if(transformationObject.iac > 0)
  {
    levelPercentageTeacher += transformationObject.iac
  }
  return levelPercentageTeacher;
}




function calculatePercentageAmount(amount, percentage)
{
    var discount = (amount * percentage)/100 
	return discount
}



function getMultiplicationStudent(division,transformationObject)
{
  
  if(transformationObject.ipp > 0)
  {
    division=100.0;
    var percentage = division + transformationObject.ipp
    division = percentage/100.0
  }else if(transformationObject.dpp > 0)
  { 
    division=100.0;
    division -=transformationObject.dpp
    division = division/100.0
  }else 
    if(transformationObject.dpp === 0) {
    division = 1.0;
    }
  return division
}

function getMultiplicationTeacher (division , transformationObject)
{
  if(transformationObject.ipc > 0)
  {
    division=100.0;
    var percentage = division + transformationObject.ipc
    division = percentage/100.0
  }else if(transformationObject.dpc > 0)
  { 
    division=100.0;
    division -=transformationObject.dpc
    division = division/100.0
  }else 
    if(transformationObject.dpc === 0) {
    division = 1.0;
    }
  return division
}
