class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
    this.filterQuery = {};
  }

  // Filter
  filter() {
    const queryObject = { ...this.queryString };

    const excludedFields = ["page", "limit", "keyword", "sort", "fields"];

    excludedFields.forEach((field) => delete queryObject[field]);

    let queryString = JSON.stringify(queryObject);

    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`,
    );

    this.filterQuery = JSON.parse(queryString);

    this.mongooseQuery = this.mongooseQuery.find(this.filterQuery);

    return this;
  }

  // Search
  search() {
    if (this.queryString.keyword?.trim()) {
      const keyword = this.queryString.keyword.trim();

      const escapedKeyword = keyword.replace(
  /[.*+?^${}()|[\]\\]/g,
  "\\$&",
);

const searchQuery = {
  title: {
    $regex: escapedKeyword,
    $options: "i",
  },
};

      this.filterQuery = {
        ...this.filterQuery,
        ...searchQuery,
      };

      this.mongooseQuery = this.mongooseQuery.find(searchQuery);
    }

    return this;
  }

  // Sort
  sort() {
    if (this.queryString.sort) {
      this.mongooseQuery = this.mongooseQuery.sort(
        this.queryString.sort.split(",").join(" "),
      );
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
    }

    return this;
  }

  // Fields
  fields() {
    if (this.queryString.fields) {
      this.mongooseQuery = this.mongooseQuery.select(
        this.queryString.fields.split(",").join(" "),
      );
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }

    return this;
  }

  // Pagination
  paginate(totalDocuments) {
    const page = Math.max(1, parseInt(this.queryString.page, 10) || 1);

    const limit = Math.min(
      100,
      Math.max(1, parseInt(this.queryString.limit, 10) || 4),
    );

    const skip = (page - 1) * limit;
    const numberOfPages = Math.ceil(totalDocuments / limit);
    console.log("this is Pagination", {
      totalDocuments,
      limit,
      numberOfPages: Math.ceil(totalDocuments / limit),
    });
    this.paginationResult = {
      currentPage: page,
      limit,
      totalDocuments,
      numberOfPages,
      next: page < numberOfPages ? page + 1 : null,
      prev: page > 1 && page <= numberOfPages ? page - 1 : null,
    };

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);

    return this;
  }
}

module.exports = ApiFeatures;
