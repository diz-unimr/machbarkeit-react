{
                      /* 1. Local: true, Global: true */
                      isLocalFilter && !!globalFilter.timeRange ? (
                        <>
                          <Button
                            id={item.criterion.id + "-btn"}
                            label="Lokaler Filter bearbeiten"
                            type="tertiary"
                            className="!m-0 !mt-2"
                          />
                          <Button
                            id={item.criterion.id + "-btn"}
                            label="Auf globaler Filter zurücksetzen"
                            type="tertiary"
                            className="!m-0 !mt-2"
                          />
                        </>
                      ) : /* 2. Local: false, Global: false */
                      !isLocalFilter && !globalFilter.timeRange ? (
                        <Button
                          id={item.criterion.id + "-btn"}
                          label="Lokaler Filter setzen"
                          type="tertiary"
                          className="!m-0 !mt-2"
                          onClick={() => setIsLocalFilter((prev) => !prev)}
                        />
                      ) : /* 3. Local: false, Global: true */
                      !isLocalFilter && !!globalFilter.timeRange ? (
                        <Button
                          id={item.criterion.id + "-btn"}
                          label="Lokaler Filter setzen"
                          type="tertiary"
                          className="!m-0 !mt-2"
                          onClick={() => {
                            setIsLocalFilter(true);
                            setIsLocalFilterEditing(true);
                          }}
                        />
                      ) : isLocalFilter && !globalFilter.timeRange ? (
                        <>
                          <TimeRangeOption
                            id={item.uid}
                            size="sm"
                            timeRestrictionData={
                              item.criterion.timeRestriction?.isLocalFilter
                                ? item.criterion.timeRestriction
                                : null
                            }
                            onChange={handleTimeRangeFilter}
                          />
                          <Button
                            id={item.criterion.id + "-btn"}
                            label="Lokaler Filter bearbeiten"
                            type="tertiary"
                            className="!m-0 !mt-2"
                          />
                        </>
                      ) : null
                    }