/*
	The price & cost per hour are determined by the following 6 variables
	1- Service: Basic, Standard, Premium
	2- Level: Semi, Pro, Master
	3- Hours: 5, 10, 15, 20, 30, 40, 50
	4- Location: Medellin, Cartagena, Cali, Bogota, Virtual
	5- Venue: Studio, Home
	6- Participant ratio: Number of students / number of instructors
*/

//getPriceAndCostCalculation("basic", "semi", 10, "medellin", "studio", 0);
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
 
  var serviceTypeTransformation = getServiceAmountTransformation(serviceType);
  var incrementMembershipStudent = getIncrementMembership(discountStudent,serviceTypeTransformation);
 
  var locationTransformation = getLocationTransformation(location, venue, place);
  var discountPercentageLocationStudent = getPercentageLocationStudent(incrementMembershipStudent, locationTransformation); 
  var discountPercentageLocationTeacher = getPercentageLocationTeacher(discountTeacher, locationTransformation);
  
  var discountLevel = getLevelTransformation(level);
  var levelPercentageStudent = getLevelPercentageStudent(discountPercentageLocationStudent,discountLevel);
  var levelPercentageTeacher = getLevelPercentageTeacher(discountPercentageLocationTeacher, discountLevel);

  var addedPriceFlatStudent = getAddedPriceFlatStudent(levelPercentageStudent,locationTransformation);
  var addedCostFlatTeacher = getAddedPriceFlatTeacher(levelPercentageTeacher,locationTransformation);


  return [ addedCostFlatTeacher * hours , addedPriceFlatStudent * hours];
  
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
    case "bogotastudio" :   return { 'ipp' : 20, 'dpp' : 0, 'ipc' : 20, 'dpc' : 0, 'iap' : 20000, 'iac' : 20000 };
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

function getPercentageLocationStudent(discount, transformationObject)
{
  if(transformationObject.ipp > 0 )
  {
    discount -= calculatePercentageAmount(discount, transformationObject.ipp)
  }
  return discount;
}

function getPercentageLocationTeacher(discount, transformationObject)
{
  if(transformationObject.dpp > 0)
  {
    discount -= calculatePercentageAmount(discount ,transformationObject.dpp);
  }
  if(transformationObject.ipc > 0)
  {
    discount += calculatePercentageAmount(discount,transformationObject.ipc)
  }
  return discount;
}

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
 return discount;
}

function getLevelPercentageTeacher(discount,transformationObject)
{
  if(transformationObject.ipc > 0)
  {
    discount += calculatePercentageAmount(discount,transformationObject.ipc)
  }
  return discount;
}

function getAddedPriceFlatStudent(levelPercentageStudent,transformationObject)
{
if(transformationObject.iap > 0 )
{
  levelPercentageStudent += transformationObject.iap
}
return levelPercentageStudent;

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
	return (amount * percentage) / 100
}