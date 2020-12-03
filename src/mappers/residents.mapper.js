class ResidentMapper {
  updateOne(body) {
    const mappedBody = {
      fullName: body.fullName,
      email: body.email,
      apartment: body.apartment,
      phone: body.phone,
    };

    for(const prop in mappedBody) {
      if(!mappedBody[prop]) {
        delete mappedBody[prop]
      }
    } 
    console.log(mappedBody);

    return mappedBody;
  }
}

export default new ResidentMapper();